import {writeFile} from "node:fs/promises";
import {resolve} from "node:path";

const url = "http://127.0.0.1:8080/openapi/api-docs.yaml";
const outputPath = resolve(process.cwd(), "api-docs.yaml");

async function main() {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`下载失败: ${res.status} ${res.statusText}`);
    }

    const text = await res.text();
    await writeFile(outputPath, text, "utf8");

    console.log(`已下载 ${url} -> ${outputPath}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
