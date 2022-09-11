import { Router } from "express";
import { readdirSync } from "fs";

// return src/routes
const PATH_ROUTER = `${__dirname}`;
const router = Router();

/**
 *
 * @returns
 */
const cleanFileName = (fileName: string) => {
    // remove .ts and file = index
    const file = fileName.split(".").shift();
    return file;
};

// Scan all files in src/routes, clean items.ts and index.ts, filter out index and import dinamically all routes.
// moduleRouter = { router: Router } so was exported as { router }
readdirSync(PATH_ROUTER).filter((fileName) => {
    const cleanName = cleanFileName(fileName);
    if (cleanName !== "index") {
        import(`./${cleanName}`).then((moduleRouter) => {
            router.use(`/${cleanName}`, moduleRouter.router);
        });
    }
});

export { router };
