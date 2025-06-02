'use client';
import { useBubbleSort } from '../hooks/use-sort';
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


export default function BubbleSort() {
  const [array, i, j, cnt, isDone, step, reset] = useBubbleSort();

  return (
    <Container>
    <Heading>バブルソート</Heading>

      <DisplayArray array={array} comparing={[j - 1, j]} sortedIndex={isDone ? array.length : i - 1} />
      <div className='flex flex-wrap gap-4 mt-4'>
        <ControlButton
          onClick={reset}
        >
          <FontAwesomeIcon icon={faRotateRight} />
        </ControlButton>
        <ControlButton
          onClick={step}
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
        <ListItem><span className='u-bold'>アルゴリズム:</span> 練習問題7.1(p.93)</ListItem>
      </DotList>

      <div className='u-sepline'></div>

      <Heading small>ソースコード</Heading>
      <Code title='バブルソート'>
          <CodeTabField>
              <CodeTab
                  tabKey={1}
                  fileName='bubbleSort.c'
                  format='c'
              />
          </CodeTabField>
          <CodeSource 
              tabKey={1}
              highlightedString={`<span class='hl-pp'>#include</span> <span class='hl-hf'>&lt;stdio.h&gt;</span>
<span class='hl-pp'>#define</span> <span class='hl-mc'>SIZE</span> <span class='hl-n'>6</span>

<span class='hl-vt'>void</span> <span class='hl-f'>swap</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> *, <span class='hl-vt'>int</span>*<span class='hl-b-1'>)</span>;

<span class='hl-vt'>int</span> <span class='hl-f'>main</span><span class='hl-b-1'>(</span><span class='hl-vt'>void</span><span class='hl-b-1'>)</span> <span class='hl-b-1'>{</span>
    <span class='hl-vt'>int</span> <span class='hl-v'>data</span><span class='hl-b-2'>[</span><span class='hl-mc'>SIZE</span><span class='hl-b-2'>]</span> = <span class='hl-b-2'>{</span><span class='hl-n'>65</span>, <span class='hl-n'>36</span>, <span class='hl-n'>11</span>, <span class='hl-n'>58</span>, <span class='hl-n'>23</span>, <span class='hl-n'>49</span><span class='hl-b-2'>}</span>;
    <span class='hl-vt'>int</span> <span class='hl-v'>i</span>, <span class='hl-v'>j</span>;
    
    <span class='hl-k1'>for</span> <span class='hl-b-2'>(</span><span class='hl-v'>i</span> = <span class='hl-n'>0</span>; <span class='hl-v'>i</span> &lt; <span class='hl-mc'>SIZE</span> - <span class='hl-n'>1</span>; <span class='hl-v'>i</span>++<span class='hl-b-2'>)</span> <span class='hl-b-2'>{</span>
        <span class='hl-k1'>for</span> <span class='hl-b-3'>(</span><span class='hl-v'>j</span> = <span class='hl-mc'>SIZE</span> - <span class='hl-n'>1</span>; <span class='hl-v'>j</span> &gt; <span class='hl-v'>i</span>; <span class='hl-v'>j</span>--<span class='hl-b-3'>)</span> <span class='hl-b-3'>{</span>
            <span class='hl-f'>swap</span><span class='hl-b-1'>(</span>&<span class='hl-v'>data</span><span class='hl-b-2'>[</span><span class='hl-v'>j</span> - <span class='hl-n'>1</span><span class='hl-b-2'>]</span>, &<span class='hl-v'>data</span><span class='hl-b-2'>[</span><span class='hl-v'>j</span><span class='hl-b-2'>]</span><span class='hl-b-1'>)</span>;
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
        <p><span className='u-code'>bubbleSort.c</span>は練習問題7.1のアルゴリズムをC言語で書いたものです。</p>
        <p>実際のアルゴリズム問題では要素番号が<span className='u-code'>1</span>〜<span className='u-code'>N</span>ですが、C言語では<span className='u-code'>0</span>〜<span className='u-code'>N-1</span>となる点に注意してください。</p>
      </div>

      <div className='u-sepline'></div>

      <Heading small>解説</Heading>
      <div className='mt-4'>
        <p>この<span className='u-bold u-marker bold yellow'>バブルソート</span>アルゴリズムの方針は以下のとおりです。</p>
        <Box color='blue'>
          <DotList color='blue'>
            <ListItem>配列の<span className='u-bold'>末尾</span>から順に<span className='u-bold'>隣接する2つのデータ</span>を比較する。</ListItem>
            <ListItem><span className='u-bold u-marker orange bold'>先頭に近いデータの方が大きければ</span>入れ替える。</ListItem>
          </DotList>
        </Box>
        <p>このように、末尾から順に比較していくことで<span className='u-bold'>先頭から順に値が確定</span>していきます。</p>
        <p>つまり、外側のループ(<span className='u-code'>i</span>)は<span className='u-marker orange bold'>値を確定させる要素番号</span>を、内側のループ(<span className='u-code'>j</span>)は<span className='u-marker orange bold'>比較基準の要素番号</span>を示しているのです。</p>
      </div>

      <Link to='/'>Topへ戻る</Link>
      {/* <Link to='/certificate-exam-tracer/'>Topへ戻る</Link> */}
    </Container>
  )
}