'use client';
import '../styles/radio.scss';
import { useEffect, useState } from 'react';
import useModal from '../hooks/use-modal';
import { useQuickSort } from '../hooks/use-sort';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep, faGear, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import Container from '../components/container';
import Modal from '../components/modal';
import Heading from '../components/heading';
import { TraceQuickSort } from '../components/display-array';
import ControlButton from '../components/control-button';
import { Code, CodeSource, CodeTabField, CodeTab } from '../components/code';
import Box from '../components/box';
import { DotList, ListItem } from '../components/list';
import DisplayParameters from '../components/display-parameters';
import Dataset from '../components/dataset';
import Link from '../components/link';

export default function QuickSort() {
  const [dataset, setDataset] = useState<number[] | null>(null);
  const [pivotConfig, setPivotConfig] = useState<string>('left');
  const [isOpen, openModal, closeModal] = useModal();

  const [array, left, right, pivotPos, lp, rp, action, sorted, cnt, isDone, step, reset] = useQuickSort();

  const onDataSelect = (data: number[] | null) => {
    closeModal();
    setDataset(data);
  }

  useEffect(() => {
    reset(dataset, pivotConfig);
  }, [dataset, pivotConfig]);

  return (
    <>
      <Container>
      <Heading>クイックソート</Heading>
  
        <TraceQuickSort
          array={array}
          range={[left, right]}
          pivot={pivotPos}
          comparing={action === 'moveLp' ? lp : action === 'moveRp' ? rp : -1}
          sortedIdx={sorted}
          isDone={isDone}
        />
        <div className='flex flex-wrap gap-4 mt-4'>
          <ControlButton onClick={() => openModal('setting')}>
            <FontAwesomeIcon icon={faGear} />
          </ControlButton>
            
          <ControlButton onClick={() => reset(dataset, pivotConfig)}>
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
            left:  left,
            right: right,
            lp:    lp,
            rp:    rp,
            cnt: cnt,
          }}
        />
        {/* {action} */}
        <p className='u-small'>※<span className='u-code'>cnt</span>は比較回数</p>

        <div className='u-sepline'></div>
  
        <Heading small>対象分野</Heading>
        <DotList color='blue'>
          <ListItem><span className='u-bold'>Cプログラミング:</span> 練習問題8.10(p.136)</ListItem>
        </DotList>
  
        <div className='u-sepline'></div>
  
        <Heading small>ソースコード</Heading>
        <Code title='クイックソート'>
            <CodeTabField>
                <CodeTab
                  tabKey={1}
                  fileName='quickSort.c'
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

<span class='hl-vt'>void</span> <span class='hl-f'>d_print</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> <span class='hl-b-2'>[</span><span class='hl-b-2'>]</span><span class='hl-b-1'>)</span>;
<span class='hl-vt'>void</span> <span class='hl-f'>qui_sort</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> <span class='hl-b-2'>[</span><span class='hl-b-2'>]</span>, <span class='hl-vt'>int</span>, <span class='hl-vt'>int</span><span class='hl-b-1'>)</span>;
<span class='hl-vt'>void</span> <span class='hl-f'>d_swap</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> *, <span class='hl-vt'>int</span> *<span class='hl-b-1'>)</span>;

<span class='hl-vt'>int</span> <span class='hl-f'>main</span><span class='hl-b-1'>(</span><span class='hl-vt'>void</span><span class='hl-b-1'>)</span> <span class='hl-b-1'>{</span>
    <span class='hl-vt'>int</span> <span class='hl-v'>d</span><span class='hl-b-2'>[</span><span class='hl-mc'>MAXN</span><span class='hl-b-2'>]</span> = <span class='hl-b-2'>{</span><span class='hl-n'>65</span>, <span class='hl-n'>56</span>, <span class='hl-n'>11</span>, <span class='hl-n'>58</span>, <span class='hl-n'>25</span>, <span class='hl-n'>49</span><span class='hl-b-2'>}</span>;

    <span class='hl-f'>d_print</span><span class='hl-b-2'>(</span><span class='hl-v'>d</span><span class='hl-b-2'>)</span>;
    <span class='hl-f'>qui_sort</span><span class='hl-b-2'>(</span><span class='hl-v'>d</span>, <span class='hl-n'>0</span>, <span class='hl-mc'>MAXN</span> - <span class='hl-n'>1</span><span class='hl-b-2'>)</span>;
    <span class='hl-f'>d_print</span><span class='hl-b-2'>(</span><span class='hl-v'>d</span><span class='hl-b-2'>)</span>;

    <span class='hl-k1'>return</span> <span class='hl-n'>0</span>;
<span class='hl-b-1'>}</span>

<span class='hl-cm'>// 左端の要素を分割要素(pivot)としてクイックソート</span>
<span class='hl-vt'>void</span> <span class='hl-f'>qui_sort</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> <span class='hl-v'>d</span><span class='hl-b-2'>[</span><span class='hl-b-2'>]</span>, <span class='hl-vt'>int</span> <span class='hl-v'>left</span>, <span class='hl-vt'>int</span> <span class='hl-v'>right</span><span class='hl-b-1'>)</span> <span class='hl-b-1'>{</span>
    <span class='hl-vt'>int</span> <span class='hl-v'>lp</span>, <span class='hl-v'>rp</span>, <span class='hl-v'>mid</span>;

    <span class='hl-v'>mid</span> = <span class='hl-v'>d</span><span class='hl-b-2'>[</span><span class='hl-v'>left</span><span class='hl-b-2'>]</span>;  <span class='hl-cm'>// mid ... pivot(分割要素)</span>
    <span class='hl-v'>lp</span> = <span class='hl-v'>left</span>;
    <span class='hl-v'>rp</span> = <span class='hl-v'>right</span>;

    <span class='hl-k1'>while</span> <span class='hl-b-2'>(</span><span class='hl-v'>lp</span> &lt; <span class='hl-v'>rp</span><span class='hl-b-2'>)</span> <span class='hl-b-2'>{</span>
        <span class='hl-cm'>// pivotより大きい要素を左から探索</span>
        <span class='hl-k1'>while</span> <span class='hl-b-3'>(</span><span class='hl-v'>d</span><span class='hl-b-1'>[</span><span class='hl-v'>lp</span><span class='hl-b-1'>]</span> &lt;= <span class='hl-v'>mid</span> && <span class='hl-v'>lp</span> &lt;= <span class='hl-v'>rp</span><span class='hl-b-3'>)</span> <span class='hl-b-3'>{</span>
            <span class='hl-v'>lp</span>++;
        <span class='hl-b-3'>}</span>
        <span class='hl-cm'>// pivot以下の要素を右から探索</span>
        <span class='hl-k1'>while</span> <span class='hl-b-3'>(</span><span class='hl-v'>mid</span> &lt; <span class='hl-v'>d</span><span class='hl-b-1'>[</span><span class='hl-v'>rp</span><span class='hl-b-1'>]</span> && <span class='hl-v'>lp</span> &lt;= <span class='hl-v'>rp</span><span class='hl-b-3'>)</span> <span class='hl-b-3'>{</span>
            <span class='hl-v'>rp</span>--;
        <span class='hl-b-3'>}</span>
        <span class='hl-cm'>// pivotより大きい要素を右側へ、pivot以下の要素を左側へ移動</span>
        <span class='hl-k1'>if</span> <span class='hl-b-3'>(</span><span class='hl-v'>lp</span> &lt; <span class='hl-v'>rp</span><span class='hl-b-3'>)</span> <span class='hl-b-3'>{</span>
            <span class='hl-f'>d_swap</span><span class='hl-b-1'>(</span>&<span class='hl-v'>d</span><span class='hl-b-2'>[</span><span class='hl-v'>lp</span><span class='hl-b-2'>]</span>, &<span class='hl-v'>d</span><span class='hl-b-2'>[</span><span class='hl-v'>rp</span><span class='hl-b-2'>]</span><span class='hl-b-1'>)</span>;
        <span class='hl-b-3'>}</span>
    <span class='hl-b-2'>}</span>
    <span class='hl-cm'>// ループ終了後、rpは必ずmid以下の要素を示す =&gt; midと交換することで分割が完了する</span>
    <span class='hl-f'>d_swap</span><span class='hl-b-2'>(</span>&<span class='hl-v'>d</span><span class='hl-b-3'>[</span><span class='hl-v'>left</span><span class='hl-b-3'>]</span>, &<span class='hl-v'>d</span><span class='hl-b-3'>[</span><span class='hl-v'>rp</span><span class='hl-b-3'>]</span><span class='hl-b-2'>)</span>;

    <span class='hl-cm'>// pivot未満のグループをクイックソート</span>
    <span class='hl-k1'>if</span> <span class='hl-b-2'>(</span><span class='hl-v'>left</span> &lt; <span class='hl-v'>rp</span> - <span class='hl-n'>1</span><span class='hl-b-2'>)</span> <span class='hl-b-2'>{</span>
        <span class='hl-f'>qui_sort</span><span class='hl-b-3'>(</span><span class='hl-v'>d</span>, <span class='hl-v'>left</span>, <span class='hl-v'>rp</span> - <span class='hl-n'>1</span><span class='hl-b-3'>)</span>;
    <span class='hl-b-2'>}</span>
    <span class='hl-cm'>// pivotより大きいグループをクイックソート</span>
    <span class='hl-k1'>if</span> <span class='hl-b-2'>(</span><span class='hl-v'>rp</span> + <span class='hl-n'>1</span> &lt; <span class='hl-v'>right</span><span class='hl-b-2'>)</span> <span class='hl-b-2'>{</span>
        <span class='hl-f'>qui_sort</span><span class='hl-b-3'>(</span><span class='hl-v'>d</span>, <span class='hl-v'>rp</span> + <span class='hl-n'>1</span>, <span class='hl-v'>right</span><span class='hl-b-3'>)</span>;
    <span class='hl-b-2'>}</span>
<span class='hl-b-1'>}</span>

<span class='hl-vt'>void</span> <span class='hl-f'>d_swap</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> *<span class='hl-v'>buf1</span>, <span class='hl-vt'>int</span> *<span class='hl-v'>buf2</span><span class='hl-b-1'>)</span> <span class='hl-b-1'>{</span>
    <span class='hl-vt'>int</span> <span class='hl-v'>work</span>;

    <span class='hl-v'>work</span> = *<span class='hl-v'>buf1</span>;
    *<span class='hl-v'>buf1</span> = *<span class='hl-v'>buf2</span>;
    *<span class='hl-v'>buf2</span> = <span class='hl-v'>work</span>;
<span class='hl-b-1'>}</span>

<span class='hl-vt'>void</span> <span class='hl-f'>d_print</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> <span class='hl-v'>d</span><span class='hl-b-2'>[</span><span class='hl-b-2'>]</span><span class='hl-b-1'>)</span> <span class='hl-b-1'>{</span>
    <span class='hl-vt'>int</span> <span class='hl-v'>i</span>;

    <span class='hl-k1'>for</span> <span class='hl-b-2'>(</span><span class='hl-v'>i</span> = <span class='hl-n'>0</span>; <span class='hl-v'>i</span> &lt; <span class='hl-mc'>MAXN</span>; <span class='hl-v'>i</span>++<span class='hl-b-2'>)</span> <span class='hl-b-2'>{</span>
        <span class='hl-f'>printf</span><span class='hl-b-3'>(</span><span class='hl-str'>&quot;</span><span class='hl-cs'>%5d</span><span class='hl-str'>&quot;</span>, <span class='hl-v'>d</span><span class='hl-b-1'>[</span><span class='hl-v'>i</span><span class='hl-b-1'>]</span><span class='hl-b-3'>)</span>;
    <span class='hl-b-2'>}</span>
    <span class='hl-f'>printf</span><span class='hl-b-2'>(</span><span class='hl-str'>&quot;</span><span class='hl-es'>\\n</span><span class='hl-str'>&quot;</span><span class='hl-b-2'>)</span>;
<span class='hl-b-1'>}</span>`}
            />
            <CodeSource 
              tabKey={2}
              highlightedString={`<span class='hl-pp'>#include</span> <span class='hl-hf'>&lt;stdio.h&gt;</span>
<span class='hl-pp'>#define</span> <span class='hl-mc'>SIZE</span> <span class='hl-n'>6</span>

<span class='hl-vt'>void</span> <span class='hl-f'>quick_sort</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> <span class='hl-b-2'>[</span><span class='hl-b-2'>]</span>, <span class='hl-vt'>int</span>, <span class='hl-vt'>int</span><span class='hl-b-1'>)</span>;
<span class='hl-vt'>void</span> <span class='hl-f'>swap</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> *, <span class='hl-vt'>int</span> *<span class='hl-b-1'>)</span>;
<span class='hl-vt'>void</span> <span class='hl-f'>print_array</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> <span class='hl-b-2'>[</span><span class='hl-b-2'>]</span><span class='hl-b-1'>)</span>;

<span class='hl-vt'>int</span> <span class='hl-f'>main</span><span class='hl-b-1'>(</span><span class='hl-vt'>void</span><span class='hl-b-1'>)</span> <span class='hl-b-1'>{</span>
    <span class='hl-vt'>int</span> <span class='hl-v'>data</span><span class='hl-b-2'>[</span><span class='hl-mc'>SIZE</span><span class='hl-b-2'>]</span> = <span class='hl-b-2'>{</span><span class='hl-n'>65</span>, <span class='hl-n'>56</span>, <span class='hl-n'>11</span>, <span class='hl-n'>58</span>, <span class='hl-n'>25</span>, <span class='hl-n'>49</span><span class='hl-b-2'>}</span>;

    <span class='hl-f'>print_array</span><span class='hl-b-2'>(</span><span class='hl-v'>data</span><span class='hl-b-2'>)</span>;
    <span class='hl-f'>quick_sort</span><span class='hl-b-2'>(</span><span class='hl-v'>data</span>, <span class='hl-n'>0</span>, <span class='hl-mc'>SIZE</span> - <span class='hl-n'>1</span><span class='hl-b-2'>)</span>;
    <span class='hl-f'>print_array</span><span class='hl-b-2'>(</span><span class='hl-v'>data</span><span class='hl-b-2'>)</span>;

    <span class='hl-k1'>return</span> <span class='hl-n'>0</span>;
<span class='hl-b-1'>}</span>

<span class='hl-cm'>// 左端の要素を分割要素(pivot)としてクイックソート</span>
<span class='hl-vt'>void</span> <span class='hl-f'>quick_sort</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> <span class='hl-v'>data</span><span class='hl-b-2'>[</span><span class='hl-b-2'>]</span>, <span class='hl-vt'>int</span> <span class='hl-v'>left</span>, <span class='hl-vt'>int</span> <span class='hl-v'>right</span><span class='hl-b-1'>)</span> <span class='hl-b-1'>{</span>
    <span class='hl-cm'>// ガード節 ... 処理の対象外とする条件を関数の先頭に書いておき、returnで抜ける方法</span>
    <span class='hl-k1'>if</span> <span class='hl-b-2'>(</span><span class='hl-v'>left</span> &gt;= <span class='hl-v'>right</span><span class='hl-b-2'>)</span> <span class='hl-k1'>return</span>;  <span class='hl-cm'>// ソート範囲が妥当か(left &lt; right)を確認</span>

    <span class='hl-vt'>int</span> <span class='hl-v'>lp</span>, <span class='hl-v'>rp</span>, <span class='hl-v'>pivot</span>;

    <span class='hl-v'>pivot</span> = <span class='hl-v'>data</span><span class='hl-b-2'>[</span><span class='hl-v'>left</span><span class='hl-b-2'>]</span>;  <span class='hl-cm'>// 左端をpivotに設定</span>
    <span class='hl-v'>lp</span> = <span class='hl-v'>left</span>;
    <span class='hl-v'>rp</span> = <span class='hl-v'>right</span> + <span class='hl-n'>1</span>;  <span class='hl-cm'>// 初回の&quot;--rp&quot;で右端の要素が参照されるよう1を加える</span>

    <span class='hl-k1'>while</span> <span class='hl-b-2'>(</span><span class='hl-v'>lp</span> &lt; <span class='hl-v'>rp</span><span class='hl-b-2'>)</span> <span class='hl-b-2'>{</span>
        <span class='hl-k1'>while</span> <span class='hl-b-3'>(</span><span class='hl-v'>data</span><span class='hl-b-1'>[</span>++<span class='hl-v'>lp</span><span class='hl-b-1'>]</span> &lt;= <span class='hl-v'>pivot</span> && <span class='hl-v'>lp</span> &lt;= <span class='hl-v'>rp</span><span class='hl-b-3'>)</span>;  <span class='hl-cm'>// pivotより大きい要素を左から探索</span>
        <span class='hl-k1'>while</span> <span class='hl-b-3'>(</span><span class='hl-v'>data</span><span class='hl-b-1'>[</span>--<span class='hl-v'>rp</span><span class='hl-b-1'>]</span> &gt;  <span class='hl-v'>pivot</span> && <span class='hl-v'>lp</span> &lt;= <span class='hl-v'>rp</span><span class='hl-b-3'>)</span>;  <span class='hl-cm'>// pivot以下の要素を右から探索</span>
        <span class='hl-k1'>if</span> <span class='hl-b-3'>(</span><span class='hl-v'>lp</span> &lt; <span class='hl-v'>rp</span><span class='hl-b-3'>)</span> <span class='hl-f'>swap</span><span class='hl-b-3'>(</span>&<span class='hl-v'>data</span><span class='hl-b-1'>[</span><span class='hl-v'>lp</span><span class='hl-b-1'>]</span>, &<span class='hl-v'>data</span><span class='hl-b-1'>[</span><span class='hl-v'>rp</span><span class='hl-b-1'>]</span><span class='hl-b-3'>)</span>;
    <span class='hl-b-2'>}</span>
    <span class='hl-f'>swap</span><span class='hl-b-2'>(</span>&<span class='hl-v'>data</span><span class='hl-b-3'>[</span><span class='hl-v'>left</span><span class='hl-b-3'>]</span>, &<span class='hl-v'>data</span><span class='hl-b-3'>[</span><span class='hl-v'>rp</span><span class='hl-b-3'>]</span><span class='hl-b-2'>)</span>;  <span class='hl-cm'>// ループ終了後、rpは必ずpivot以下の要素を示す =&gt; pivotと交換することで分割が完了する</span>

    <span class='hl-cm'>// ガード節によりif文が不要に</span>
    <span class='hl-f'>quick_sort</span><span class='hl-b-2'>(</span><span class='hl-v'>data</span>, <span class='hl-v'>left</span>, <span class='hl-v'>rp</span> - <span class='hl-n'>1</span><span class='hl-b-2'>)</span>;   <span class='hl-cm'>// pivot未満のグループをクイックソート</span>
    <span class='hl-f'>quick_sort</span><span class='hl-b-2'>(</span><span class='hl-v'>data</span>, <span class='hl-v'>rp</span> + <span class='hl-n'>1</span>, <span class='hl-v'>right</span><span class='hl-b-2'>)</span>;  <span class='hl-cm'>// pivotより大きいグループをクイックソート</span>
<span class='hl-b-1'>}</span>

<span class='hl-vt'>void</span> <span class='hl-f'>swap</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> *<span class='hl-v'>p1</span>, <span class='hl-vt'>int</span> *<span class='hl-v'>p2</span><span class='hl-b-1'>)</span> <span class='hl-b-1'>{</span>
    <span class='hl-vt'>int</span> <span class='hl-v'>tmp</span>;

    <span class='hl-v'>tmp</span> = *<span class='hl-v'>p1</span>;
    *<span class='hl-v'>p1</span> = *<span class='hl-v'>p2</span>;
    *<span class='hl-v'>p2</span> = <span class='hl-v'>tmp</span>;
<span class='hl-b-1'>}</span>

<span class='hl-vt'>void</span> <span class='hl-f'>print_array</span><span class='hl-b-1'>(</span><span class='hl-vt'>int</span> <span class='hl-v'>data</span><span class='hl-b-2'>[</span><span class='hl-b-2'>]</span><span class='hl-b-1'>)</span> <span class='hl-b-1'>{</span>
    <span class='hl-vt'>int</span> <span class='hl-v'>i</span>;

    <span class='hl-k1'>for</span> <span class='hl-b-2'>(</span><span class='hl-v'>i</span> = <span class='hl-n'>0</span>; <span class='hl-v'>i</span> &lt; <span class='hl-mc'>SIZE</span>; <span class='hl-v'>i</span>++<span class='hl-b-2'>)</span> <span class='hl-b-2'>{</span>
        <span class='hl-f'>printf</span><span class='hl-b-3'>(</span><span class='hl-str'>&quot;</span><span class='hl-cs'>%5d</span><span class='hl-str'>&quot;</span>, <span class='hl-v'>data</span><span class='hl-b-1'>[</span><span class='hl-v'>i</span><span class='hl-b-1'>]</span><span class='hl-b-3'>)</span>;
    <span class='hl-b-2'>}</span>
    <span class='hl-f'>printf</span><span class='hl-b-2'>(</span><span class='hl-str'>&quot;</span><span class='hl-es'>\\n</span><span class='hl-str'>&quot;</span><span class='hl-b-2'>)</span>;
<span class='hl-b-1'>}</span>`}
            />
        </Code>
        <div>
          <p><span className='u-code'>quickSort.c</span>は練習問題8.10の解答です。</p>
          <p><span className='u-code'>better.c</span>はクイックソートをより簡潔に書いたものです。様々な工夫を施しているので、余裕があれば読んでみてください。</p>
        </div>
  
        <div className='u-sepline'></div>
  
        <Heading small>解説</Heading>
        <div className='mt-4'>
          <p><span className='u-bold u-marker bold yellow'>クイックソート</span>は、<span className='u-bold'>分割統治法</span>に基づく高速なソーティングアルゴリズムです。</p>
          <p>アルゴリズムの方針は以下のとおりです。</p>
          <Box color='blue'>
            <DotList color='blue'>
              <ListItem>分割要素(<span className='u-bold u-marker orange bold'>pivot</span>)を1つ決め、それ以上とそれ未満のグループに分割する。</ListItem>
              <ListItem>各グループに対し<span className='u-bold'>再帰的に</span>クイックソートを実行する。</ListItem>
            </DotList>
          </Box>
          <p>グループの分割終了後、<span className='u-bold u-marker orange bold'>pivotは位置が確定している</span>点が重要です。</p>
        </div>
  
        <Link to='/'>Topへ戻る</Link>
      </Container>
      <Modal
        className={'max-w-[450px] w-2/3 h-2/3 p-8 bg-white rounded-2xl'}
        isOpen={isOpen('setting')}
        onClose={closeModal}
      >
        <> 
          <h1 className='font-bold text-2xl w-fit mx-auto mb-8 px-4 border-b-2 border-cyan-500'>Data Settings</h1>
          <Dataset name='Dataset-1' data={[4, 1, 6, 2, 3, 5, 7]} onClick={onDataSelect} />
          <Dataset name='Dataset-2' data={[7, 6, 5, 4, 3, 2, 1]} onClick={onDataSelect} />
          <div className='cursor-pointer flex flex-col rounded-xl mb-4 p-2 border border-gray-400 hover:bg-gray-300/10 hover:border-blue-400 hover:border-2' onClick={() => onDataSelect(null)}>
            <h1 className='font-bold text-sm mb-2'>Generate Randomly</h1>
            <div className='u-code w-fit' style={{ margin: '0 auto', fontSize: '1em' }}>[?, ?, ?, ?, ?, ?, ?]</div>
          </div>
          <div className='radios'>
            <h2 className='font-semibold'>Pivot:</h2>
            <label>
              <input type='radio' name='pivot' value='left' checked={pivotConfig === 'left'} onClick={(e) => setPivotConfig(e.currentTarget.value)} />
              <span>左端</span>
            </label>
            <label>
              <input type='radio' name='pivot' value='right' checked={pivotConfig === 'right'} onClick={(e) => setPivotConfig(e.currentTarget.value)} />
              <span>右端</span>
            </label>
          </div>
        </>
      </Modal>
    </>
  )
}