'use client';
import { useState } from 'react';
import generateArray from '../utils/generate-array';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import Container from '../components/container';
import Heading from '../components/heading';
import DisplayArray from '../components/display-array';
import ControlButton from '../components/control-button';
import { Code, CodeSource, CodeTabField, CodeTab } from '../components/code';
import Box from '../components/box';
import { DotList, ListItem } from '../components/list';
import DisplayParameters from '../components/display-parameters';
import Link from '../components/link';

// const selectionSort = (array: number[]) => {
//   const len = array.length;
//   for (let i = 0; i < len - 1; i++) {
//     for (let j = i + 1; j < len; j++) {
//       if (array[i] > array[j]) {
//         const tmp = array[i];
//         array[i] = array[j];
//         array[j] = tmp;
//       }
//     }
//   }
// }

const arraySize = 7;

export default function SelectionSort() {
  const [array, setArray] = useState(generateArray({ len: arraySize }));
  const [i, setI] = useState(0);
  const [j, setJ] = useState(1);
  const [cnt, setCnt] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const stepSort = () => {
    let newArray = [...array];
    const len = array.length;

    if (newArray[i] > newArray[j]) {
      const tmp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = tmp;
    }
    setArray(newArray);

    const nextI = i + 1;  // isDone判定に更新直後のiを用いるため
    if (j >= len - 1) {
      setI(nextI);
      setJ(nextI + 1);
    } else {
      setJ(j + 1);
    }
  
    setCnt(prev => prev + 1);
    if (nextI >= len - 1) setIsDone(true);
  }

  const reset = () => {
    setArray(generateArray({ len: arraySize }));
    setI(0);
    setJ(1);
    setCnt(0);
    setIsDone(false);
  }

  return (
    <Container>
    <Heading>選択ソート</Heading>

      <DisplayArray array={array} comparing={[i, j]} sortedIndex={isDone ? array.length : i - 1} />
      <div className='flex flex-wrap gap-4 mt-4'>
        <ControlButton
          onClick={reset}
        >
          <FontAwesomeIcon icon={faRotateRight} />
        </ControlButton>
        <ControlButton
          onClick={stepSort}
          disabled={isDone}
        >
          <FontAwesomeIcon icon={faForwardStep} />
        </ControlButton>
      </div>
      <DisplayParameters
        params={{
          i:   i,
          j:   j,
          cnt: cnt,
        }}
      />
      <p className='u-small'>※<span className='u-code'>cnt</span>は実行回数</p>

      <div className='u-sepline'></div>

      <Heading small>対象分野</Heading>
      <DotList color='blue'>
        <ListItem><span className='u-bold'>アルゴリズム:</span> 例題7.1(p.92)</ListItem>
        <ListItem><span className='u-bold'>Cプログラミング:</span> 例題8.1(p.121)</ListItem>
      </DotList>

      <div className='u-sepline'></div>

      <Heading small>ソースコード</Heading>
      <Code title='選択ソート'>
          <CodeTabField>
              <CodeTab
                  tabKey={1}
                  fileName='selectionSort.c'
                  format='c'
              />
              <CodeTab
                  tabKey={2}
                  fileName='better.c'
                  format='c'
              />
          </CodeTabField>
          <CodeSource 
              tabKey={1}
              highlightedString={`<span class='hl-pp'>#include</span> <span class='hl-hf'>&lt;stdio.h&gt;</span>
<span class='hl-pp'>#define</span> <span class='hl-mc'>MAXN</span> <span class='hl-n'>6</span>

<span class='hl-vt'>void</span> <span class='hl-f'>d_swap</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> *, <span class='hl-vt'>int</span> *<span class='hl-b-1'>)</span>;

<span class='hl-vt'>int</span> <span class='hl-f'>main</span><span class='hl-b-1'>(</span><span class='hl-vt'>void</span><span class='hl-b-1'>)</span> <span class='hl-b-1'>{</span>
    <span class='hl-vt'>int</span> <span class='hl-v'>data</span><span class='hl-b-2'>[</span><span class='hl-mc'>MAXN</span><span class='hl-b-2'>]</span> = <span class='hl-b-2'>{</span><span class='hl-n'>65</span>, <span class='hl-n'>36</span>, <span class='hl-n'>11</span>, <span class='hl-n'>58</span>, <span class='hl-n'>23</span>, <span class='hl-n'>49</span><span class='hl-b-2'>}</span>;
    <span class='hl-vt'>int</span> <span class='hl-v'>i</span>, <span class='hl-v'>j</span>;

    <span class='hl-k1'>for</span> <span class='hl-b-2'>(</span><span class='hl-v'>i</span> = <span class='hl-n'>0</span>; <span class='hl-v'>i</span> &lt; <span class='hl-mc'>MAXN</span> - <span class='hl-n'>1</span>; <span class='hl-v'>i</span>++<span class='hl-b-2'>)</span> <span class='hl-b-2'>{</span>
        <span class='hl-k1'>for</span> <span class='hl-b-3'>(</span><span class='hl-v'>j</span> = <span class='hl-v'>i</span> + <span class='hl-n'>1</span>; <span class='hl-v'>j</span> &lt; <span class='hl-mc'>MAXN</span>; <span class='hl-v'>j</span>++<span class='hl-b-3'>)</span> <span class='hl-b-3'>{</span>
          <span class='hl-k1'>if</span> <span class='hl-b-1'>(</span><span class='hl-v'>data</span><span class='hl-b-2'>[</span><span class='hl-v'>i</span><span class='hl-b-2'>]</span> &gt; <span class='hl-v'>data</span><span class='hl-b-2'>[</span><span class='hl-v'>j</span><span class='hl-b-2'>]</span><span class='hl-b-1'>)</span> <span class='hl-b-1'>{</span>
              <span class='hl-f'>d_swap</span><span class='hl-b-2'>(</span>&<span class='hl-v'>data</span><span class='hl-b-3'>[</span><span class='hl-v'>i</span><span class='hl-b-3'>]</span>, &<span class='hl-v'>data</span><span class='hl-b-3'>[</span><span class='hl-v'>j</span><span class='hl-b-3'>]</span><span class='hl-b-2'>)</span>;
          <span class='hl-b-1'>}</span>
        <span class='hl-b-3'>}</span>
    <span class='hl-b-2'>}</span>

    <span class='hl-k1'>for</span> <span class='hl-b-2'>(</span><span class='hl-v'>i</span> = <span class='hl-n'>0</span>; <span class='hl-v'>i</span> &lt; <span class='hl-mc'>MAXN</span>; <span class='hl-v'>i</span>++<span class='hl-b-2'>)</span> <span class='hl-b-2'>{</span>
        <span class='hl-f'>printf</span><span class='hl-b-3'>(</span><span class='hl-str'>&quot;</span><span class='hl-cs'>%5d</span><span class='hl-str'>&quot;</span>, <span class='hl-v'>data</span><span class='hl-b-1'>[</span><span class='hl-v'>i</span><span class='hl-b-1'>]</span><span class='hl-b-3'>)</span>;
    <span class='hl-b-2'>}</span>

    <span class='hl-k1'>return</span> <span class='hl-n'>0</span>;
<span class='hl-b-1'>}</span>

<span class='hl-vt'>void</span> <span class='hl-f'>d_swap</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> *<span class='hl-v'>dp1</span>, <span class='hl-vt'>int</span> *<span class='hl-v'>dp2</span><span class='hl-b-1'>)</span> <span class='hl-b-1'>{</span>
    <span class='hl-vt'>int</span> <span class='hl-v'>temp</span>;

    <span class='hl-v'>temp</span> = *<span class='hl-v'>dp1</span>;
    *<span class='hl-v'>dp1</span> = *<span class='hl-v'>dp2</span>;
    *<span class='hl-v'>dp2</span> = <span class='hl-v'>temp</span>;
<span class='hl-b-1'>}</span>`}
          />
          <CodeSource
              tabKey={2}
              highlightedString={`<span class='hl-pp'>#include</span> <span class='hl-hf'>&lt;stdio.h&gt;</span>
<span class='hl-pp'>#define</span> <span class='hl-mc'>SIZE</span> <span class='hl-n'>6</span>

<span class='hl-vt'>void</span> <span class='hl-f'>swap</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> *, <span class='hl-vt'>int</span> *<span class='hl-b-1'>)</span>;

<span class='hl-vt'>int</span> <span class='hl-f'>main</span><span class='hl-b-1'>(</span><span class='hl-vt'>void</span><span class='hl-b-1'>)</span> <span class='hl-b-1'>{</span>
    <span class='hl-vt'>int</span> <span class='hl-v'>data</span><span class='hl-b-2'>[</span><span class='hl-mc'>SIZE</span><span class='hl-b-2'>]</span> = <span class='hl-b-2'>{</span><span class='hl-n'>65</span>, <span class='hl-n'>36</span>, <span class='hl-n'>11</span>, <span class='hl-n'>58</span>, <span class='hl-n'>23</span>, <span class='hl-n'>49</span><span class='hl-b-2'>}</span>;
    <span class='hl-vt'>int</span> <span class='hl-v'>i</span>, <span class='hl-v'>j</span>;

    <span class='hl-k1'>for</span> <span class='hl-b-2'>(</span><span class='hl-v'>i</span> = <span class='hl-n'>0</span>; <span class='hl-v'>i</span> &lt; <span class='hl-mc'>SIZE</span> - <span class='hl-n'>1</span>; <span class='hl-v'>i</span>++<span class='hl-b-2'>)</span> <span class='hl-b-2'>{</span>
        <span class='hl-k1'>for</span> <span class='hl-b-3'>(</span><span class='hl-v'>j</span> = <span class='hl-v'>i</span> + <span class='hl-n'>1</span>; <span class='hl-v'>j</span> &lt; <span class='hl-mc'>SIZE</span>; <span class='hl-v'>j</span>++<span class='hl-b-3'>)</span> <span class='hl-b-3'>{</span>
            <span class='hl-k1'>if</span> <span class='hl-b-1'>(</span><span class='hl-v'>data</span><span class='hl-b-2'>[</span><span class='hl-v'>i</span><span class='hl-b-2'>]</span> &gt; <span class='hl-v'>data</span><span class='hl-b-2'>[</span><span class='hl-v'>j</span><span class='hl-b-2'>]</span><span class='hl-b-1'>)</span> <span class='hl-b-1'>{</span>
                <span class='hl-f'>swap</span><span class='hl-b-2'>(</span>&<span class='hl-v'>data</span><span class='hl-b-3'>[</span><span class='hl-v'>i</span><span class='hl-b-3'>]</span>, &<span class='hl-v'>data</span><span class='hl-b-3'>[</span><span class='hl-v'>j</span><span class='hl-b-3'>]</span><span class='hl-b-2'>)</span>;
            <span class='hl-b-1'>}</span>
        <span class='hl-b-3'>}</span>
    <span class='hl-b-2'>}</span>

    <span class='hl-k1'>for</span> <span class='hl-b-2'>(</span><span class='hl-v'>i</span> = <span class='hl-n'>0</span>; <span class='hl-v'>i</span> &lt; <span class='hl-mc'>SIZE</span>; <span class='hl-v'>i</span>++<span class='hl-b-2'>)</span> <span class='hl-b-2'>{</span>
        <span class='hl-f'>printf</span><span class='hl-b-3'>(</span><span class='hl-str'>&quot;</span><span class='hl-cs'>%5d</span><span class='hl-str'>&quot;</span>, <span class='hl-v'>data</span><span class='hl-b-1'>[</span><span class='hl-v'>i</span><span class='hl-b-1'>]</span><span class='hl-b-3'>)</span>;
    <span class='hl-b-2'>}</span>

    <span class='hl-k1'>return</span> <span class='hl-n'>0</span>;
<span class='hl-b-1'>}</span>

<span class='hl-vt'>void</span> <span class='hl-f'>swap</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> *<span class='hl-v'>p1</span>, <span class='hl-vt'>int</span> *<span class='hl-v'>p2</span><span class='hl-b-1'>)</span> <span class='hl-b-1'>{</span>
    <span class='hl-vt'>int</span> <span class='hl-v'>tmp</span>;

    <span class='hl-v'>tmp</span> = *<span class='hl-v'>p1</span>;
    *<span class='hl-v'>p1</span> = *<span class='hl-v'>p2</span>;
    *<span class='hl-v'>p2</span> = <span class='hl-v'>tmp</span>;
<span class='hl-b-1'>}</span>`}
          />
      </Code>
      <div>
        <p><span className='u-code'>selectionSort.c</span>は例題8.1の解答です。</p>
        <p> <span className='u-code'>better.c</span>は変数名などを改善したものです。興味がある人は眺めてみてください。</p>
      </div>

      <div className='u-sepline'></div>

      <Heading small>解説</Heading>
      <div className='mt-4'>
        <p>この<span className='u-bold u-marker bold yellow'>選択ソート</span>アルゴリズムの方針は以下のとおりです。</p>
        <Box color='blue'>
          <DotList color='blue'>
            <ListItem>ソートが完了していない領域の<span className='u-bold'>先頭データ</span>と<span className='u-bold'>2つ目以降のデータ</span>を順に比べる。</ListItem>
            <ListItem>そのデータが<span className='u-bold u-marker orange bold'>小さければ</span>先頭と入れ替える。</ListItem>
          </DotList>
        </Box>
        <p>このように、このアルゴリズムでは先頭から順に値が確定していきます。</p>
        <p>つまり、外側のループ(<span className='u-code'>i</span>)は<span className='u-marker orange bold'>値を確定させる要素番号</span>を、内側のループ(<span className='u-code'>j</span>)は<span className='u-marker orange bold'>比較対象の要素番号</span>を示しているのです。</p>

      </div>

      {/* <Link to='/'>Topへ戻る</Link> */}
      <Link to='/certificate-exam-tracer/'>Topへ戻る</Link>
    </Container>
  )
}