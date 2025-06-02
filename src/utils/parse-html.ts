import parse from 'html-react-parser';

export default function parseHTML(str: string) {
    return parse(str);
}