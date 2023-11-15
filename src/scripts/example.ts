import { fileURLToPath } from "url";
import { initPlaywrightFunc } from "../libs/init-playwright-func.js";
import { chromium, Page, ElementHandle } from 'playwright';
import playwright from "playwright";
import path from 'path';
import fs from 'fs';

const getCssPath = async (page: Page, handle: ElementHandle) => {
    const s = (el: any) => {
        let path = [], parent;
        while (parent = el.parentNode) {
            let tag = el.tagName.toLowerCase(), siblings;
            if (tag !== "html" && tag !== "body") {
                let prefixedTag = tag;
                siblings = Array.from((parent as HTMLElement).children);
                if (siblings.filter((el: any) => el.tagName.toLowerCase() == tag).length > 1) {
                    let i = siblings.indexOf(el);
                    prefixedTag += `:nth-child(${i + 1})`;
                }
                path.unshift(prefixedTag);
            }
            el = parent;
        }
        return path.join(" > ");
    }
    const cssPath = await page.evaluate(s, handle);
    return cssPath;
}

const getImageNameFromSrc = (src: string) => {
    return src.split('/').pop() || 'unknown.png';
}

async function captureImages(url: string,  deviceType: string, viewport: {width: number, height: number}) {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: viewport });
    const dirname = 'outputs/ss/';
    await page.goto(url, { waitUntil: 'networkidle' });

    const imgTags = await page.$$('img');

    const imageInfos: Array<{name: string, cssSelector: string, position: {x: number, y: number, width: number, height: number}, srcURL: string}> = [];

    for (let i = 0; i < imgTags.length; i++) {
        const srcURL = await imgTags[i].getAttribute('src') || '';
        const selector = await getCssPath(page, imgTags[i]);
        const boundingBox = await imgTags[i].boundingBox();

        if (boundingBox === null || boundingBox.x < 0 || boundingBox.y < 0) continue;

        let fileName = getImageNameFromSrc(srcURL); // Use image name from src as filename
        // 拡張子をpngに変更
        const ext = path.extname(fileName);
        if (ext !== '.png') {
            const base = path.basename(fileName, ext);
            fileName = `${base}.png`;
        }        
        const screenshotPath = path.join(dirname, deviceType, fileName);

        imageInfos.push({
            name: fileName,
            cssSelector: selector,
            position: boundingBox,
            srcURL: srcURL,
        });

        await imgTags[i].screenshot({ path: screenshotPath });
        console.timeLog('Total processing time', `Saved screenshot of ${fileName}`);
    }

    await page.screenshot({ path: path.join(dirname, `${deviceType}_screenshot.png`), fullPage: true });

    fs.writeFileSync(path.join(dirname, `${deviceType}_imageInfos.json`), JSON.stringify(imageInfos, null, 2));
    await browser.close();
}

export const example = async (page: playwright.Page) => {
  const targetUrl = process.argv[2];
  if (!targetUrl) {
    console.error('Please provide a URL as the first argument.');
    process.exit(1);
  }

    console.time('Total processing time');
    await captureImages(targetUrl, 'pc', { width: 1280, height: 720 });
    await captureImages(targetUrl, 'sp', { width: 375, height: 812 });
    console.timeEnd(`Total processing time`);
};