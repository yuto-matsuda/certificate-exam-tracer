export default async function textCopy(text: string) {
    try {
        navigator.clipboard.writeText(text);
    } catch(err) {
        console.log(err);
    }
}