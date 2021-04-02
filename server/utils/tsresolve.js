/**
 * Since typescript does not come with native replacement for the "paths"
 * option in the configuration file, we had to create our own. Existing libraries
 * did not fit our own setup.
 */

const fs = require('fs');
const path = require('path');
const rif = require('replace-in-file');

const base = process.cwd();
const tsconfig = JSON.parse(fs.readFileSync('tsconfig.release.json'));

const outputdir = path.join(base, tsconfig.compilerOptions.outDir);

/**
 * Read all files in a directory
 * @param {string} dir 
 * @returns Promise<string[]> List of files and directories.
 */
const readDir = async (dir) => {
    const data = await (new Promise((res, rej) => {
        fs.readdir(dir, (e, data) => {
            if(e) {
                console.error(e);
                return rej(e);
            }
            return res(data);
        });
    }));
    return data;
}

/**
 * Find files in `dir` and replace the paths.
 * @param {string} dir 
 * @param {number} depth 
 * @returns Promise<string[]> List of files content has possibly been replaced in.
 */
const findAndReplace = async(dir, depth) => {

    let files = [];
    const contents = await readDir(dir, depth);
    for(const f of contents) {
        const pf = path.join(dir, f);
        const stat = fs.lstatSync(pf);
        if(stat.isFile() && f.slice(-2) === 'js') {

            const rep = "../".repeat(depth);
            // console.log(`${f} is at depth ${depth}, @server/ would be replaced with '${rep}'.`);
            await rif({
                from: /@server\//g,
                to: `./${rep}`,
                files: pf,
            });

            files.push(pf);
        } else if(stat.isDirectory() && f != 'node_modules') {
            const subContents = await findAndReplace(pf, (depth+1));
            files = [...files, ...subContents];
        }
    }

    return files;

}

(async () => {
    console.log(`Reading ${outputdir}`);

    const files = await findAndReplace(outputdir, 0);
    //console.log(files);

    console.log(`Finished replace in ${files.length}`);

})().catch(e => {
    console.error(e);
})
