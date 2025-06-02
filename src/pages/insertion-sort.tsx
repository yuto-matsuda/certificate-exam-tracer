'use client';
import { useInsertionSort } from '../hooks/use-sort';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import Container from '../components/container';
import Heading from '../components/heading';
import { TraceInsertionSort } from '../components/display-array';
import ControlButton from '../components/control-button';
import { Code, CodeSource, CodeTabField, CodeTab } from '../components/code';
import Box from '../components/box';
import { DotList, ListItem } from '../components/list';
import DisplayParameters from '../components/display-parameters';
import Link from '../components/link';

export default function InsertionSort() {
  const [array, i, j, t, cnt, isDone, step, reset] = useInsertionSort();

  return (
    <Container>
    <Heading>挿入ソート</Heading>

      <TraceInsertionSort array={array} t={t} comparing={j} sortedIndex={i} isDone={isDone} />
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
        <ListItem><span className='u-bold'>アルゴリズム:</span> 練習問題7.2(p.94)</ListItem>
      </DotList>

      <div className='u-sepline'></div>

      <Heading small>ソースコード</Heading>
      <Code title='挿入ソート'>
          <CodeTabField>
              <CodeTab
                  tabKey={1}
                  fileName='insertionSort.c'
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
    <span class='hl-vt'>int</span> <span class='hl-v'>i</span>, <span class='hl-v'>j</span>, <span class='hl-v'>work</span>;
    
    <span class='hl-k1'>for</span> <span class='hl-b-2'>(</span><span class='hl-v'>i</span> = <span class='hl-n'>0</span>; <span class='hl-v'>i</span> &lt; <span class='hl-mc'>SIZE</span> - <span class='hl-n'>1</span>; <span class='hl-v'>i</span>++<span class='hl-b-2'>)</span> <span class='hl-b-2'>{</span>
        <span class='hl-v'>work</span> = <span class='hl-v'>data</span><span class='hl-b-3'>[</span><span class='hl-v'>i</span> + <span class='hl-n'>1</span><span class='hl-b-3'>]</span>;  <span class='hl-cm'>// 挿入データの退避</span>

        <span class='hl-cm'>// 挿入位置の確保(後ろからずらしていく)</span>
        <span class='hl-k1'>for</span> <span class='hl-b-3'>(</span><span class='hl-v'>j</span> = <span class='hl-v'>i</span>; <span class='hl-v'>j</span> &gt;= <span class='hl-n'>0</span> && <span class='hl-v'>data</span><span class='hl-b-1'>[</span><span class='hl-v'>j</span><span class='hl-b-1'>]</span> &gt; <span class='hl-v'>work</span>; <span class='hl-v'>j</span>--<span class='hl-b-3'>)</span> <span class='hl-b-3'>{</span>
            <span class='hl-v'>data</span><span class='hl-b-1'>[</span><span class='hl-v'>j</span> + <span class='hl-n'>1</span><span class='hl-b-1'>]</span> = <span class='hl-v'>data</span><span class='hl-b-1'>[</span><span class='hl-v'>j</span><span class='hl-b-1'>]</span>;
        <span class='hl-b-3'>}</span>

        <span class='hl-v'>data</span><span class='hl-b-3'>[</span><span class='hl-v'>j</span> + <span class='hl-n'>1</span><span class='hl-b-3'>]</span> = <span class='hl-v'>work</span>;  <span class='hl-cm'>// ソート済み領域へ挿入</span>
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
        <p><span className='u-code'>insertionSort.c</span>は練習問題7.2のアルゴリズムをC言語で書いたものです。</p>
        <p>実際のアルゴリズム問題では要素番号が<span className='u-code'>1</span>〜<span className='u-code'>N</span>ですが、C言語では<span className='u-code'>0</span>〜<span className='u-code'>N-1</span>となる点に注意してください。</p>
        <p>また、フローチャートではループの終了条件を書きますが、C言語では継続条件を書く点にも注意が必要です。</p>
      </div>

      <div className='u-sepline'></div>

      <Heading small>解説</Heading>
      <div className='mt-4'>
        <p><span className='u-bold u-marker bold yellow'>挿入ソート</span>は、<span className='u-bold'>「ソート済み領域の適切な位置に次のデータを挿入する」</span>という考えに基づいたソーティングアルゴリズムです。</p>
        <p>アルゴリズムの方針は以下のとおりです。</p>
        <Box color='blue'>
          <DotList color='blue'>
            <ListItem>ソートが完了していない領域の先頭データを挿入データとして退避する。</ListItem>
            <ListItem>ソート済み領域の中で、<span className='u-bold'>挿入位置を確保</span>する(<span className='u-marker orange bold'>後ろにずらしてスペースを確保</span>)</ListItem>
            <ListItem>データを挿入する。</ListItem>
          </DotList>
        </Box>
        <p>このように、このアルゴリズムではデータの挿入により<span className='u-bold'>徐々にソート済み領域を広げていきます</span>。</p>
        <p><span className='u-code'>i</span>は<span className='u-marker orange bold'>ソート済み領域の末尾</span>を、<span className='u-code'>j</span>は<span className='u-marker orange bold'>挿入位置</span>を示している点が重要です。</p>

      </div>

      <Link to='/'>Topへ戻る</Link>
      {/* <Link to='/certificate-exam-tracer/'>Topへ戻る</Link> */}
    </Container>
  )
}