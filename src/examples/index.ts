/* eslint-disable no-console */
import { stringify, createStringifyFunction } from '..';

const main = () => {
    const compactStringify = createStringifyFunction({ compact: true });
    const colorfulEndlessStringify = createStringifyFunction({ colors: true, depth: null });

    const a = compactStringify({ a: 1 });
    console.log(a);

    const b = colorfulEndlessStringify({ a: { b: { c: [1, 2, 3] } } });
    console.log(b);

    const c = stringify({ c: 2 }, {});
    console.log(c);
};

main();
