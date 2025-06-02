'use client';
import { useEffect, useRef, useState } from 'react';
import { validateNumber } from '../utils/validate-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import Container from '../components/container';
import Accordion from '../components/accordion';
import Heading from '../components/heading';
import ControlButton from '../components/control-button';
import DisplayParameters from '../components/display-parameters';

const canvasWidth  = 600;
const canvasHeight = 400;
const circleColor = '#8A2BE2';
const maxBounce = 50;
const defaultParams = {
  x0:        100,
  y0:        100,
  dx:        10,
  dy:        10,
  r:         10,
};

export default function BoundBall() {
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(isPlaying);  // アニメーションフレーム内で最新のisPlayingを扱うため
  const animationRef = useRef<number | null>(null);
  const canvasRef    = useRef<HTMLCanvasElement | null>(null);

  const x0Ref = useRef<HTMLInputElement>(null);
  const y0Ref = useRef<HTMLInputElement>(null);
  const dxRef = useRef<HTMLInputElement>(null);
  const dyRef = useRef<HTMLInputElement>(null);
  const rRef  = useRef<HTMLInputElement>(null);

  // For animation
  const paramsRef = useRef({
    x0:  defaultParams.x0,
    y0:  defaultParams.y0,
    dx:  defaultParams.dx,
    dy:  defaultParams.dy,
    r:   defaultParams.r,
    cnt: 1,
  });

  // For displaying parameters
  const [currentParams, setCurrentParams] = useState({ ...paramsRef.current });

  const drawCircle = (ctx: CanvasRenderingContext2D, x0: number, y0: number, r: number) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = circleColor;
    ctx.beginPath();
    ctx.arc(x0, y0, r, 0, 2 * Math.PI);
    ctx.fill();
  }

  const move = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const params = paramsRef.current;
    if (params.cnt > maxBounce) return;

    drawCircle(ctx, params.x0, params.y0, params.r);

    let bounced = false;
    if (params.x0 - params.r <= 0 || params.x0 + params.r >= canvasWidth) {
      params.dx = -params.dx;
      bounced = true;
    }
    if (params.y0 - params.r <= 0 || params.y0 + params.r >= canvasHeight) {
      params.dy = -params.dy;
      bounced = true;
    }

    params.x0 += params.dx;
    params.y0 += params.dy;
    if (bounced) params.cnt++;

    setCurrentParams({ ...params });
  }

  const animate = () => {
    move();

    if (paramsRef.current.cnt <= maxBounce) {
      if (isPlayingRef.current) animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsPlaying(false);
    }
  }

  const handleParamChange = () => {
    const r  = validateNumber(rRef , 1, 100, defaultParams.r);
    const x0 = validateNumber(x0Ref, r, canvasWidth  - r - 1, defaultParams.x0);
    const y0 = validateNumber(y0Ref, r, canvasHeight - r - 1, defaultParams.y0);
    const dx = validateNumber(dxRef, 1, 100, defaultParams.dx);
    const dy = validateNumber(dyRef, 1, 100, defaultParams.dy);

    if (!isPlaying) {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      paramsRef.current = { x0, y0, dx, dy, r, cnt: paramsRef.current.cnt };
      setCurrentParams({ ...paramsRef.current });
      drawCircle(ctx, x0, y0, r);
    }
  }

  const toggleAnimation = () => {  
    if (isPlaying) {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      animationRef.current = requestAnimationFrame(animate);
    }
  }

  const resetAnimation = () => {
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    paramsRef.current = {
      x0:  Number(x0Ref.current?.value),
      y0:  Number(y0Ref.current?.value),
      dx:  Number(dxRef.current?.value),
      dy:  Number(dyRef.current?.value),
      r:   Number(rRef.current?.value),
      cnt: 1,
    }
    setCurrentParams({ ...paramsRef.current });
    setIsPlaying(false);

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    drawCircle(ctx, paramsRef.current.x0, paramsRef.current.y0, paramsRef.current.r);
  }

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    drawCircle(ctx, defaultParams.x0, defaultParams.y0, defaultParams.r);

    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current)
    }
  }, []);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  return (
    <Container>
      <Heading>バウンドボール</Heading>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className='border border-gray-400 w-full bg-blue-50'
      />
      <div className='flex flex-wrap justify-center items-center gap-8 mt-8'>
        <label>
          <span className='font-bold mr-2'>x0:</span>
          <input type='text' defaultValue={defaultParams.x0} ref={x0Ref} onBlur={handleParamChange} className='border border-gray-400 px-1 w-12 text-center' />
        </label>
        <label>
          <span className='font-bold mr-2'>y0:</span>
          <input type='text' defaultValue={defaultParams.y0} ref={y0Ref} onBlur={handleParamChange} className='border border-gray-400 px-1 w-12 text-center' />
        </label>
        <label>
          <span className='font-bold mr-2'>dx:</span>
          <input type='text' defaultValue={defaultParams.dx} ref={dxRef} onBlur={handleParamChange} className='border border-gray-400 px-1 w-12 text-center' />
        </label>
        <label>
          <span className='font-bold mr-2'>dy:</span>
          <input type='text' defaultValue={defaultParams.dy} ref={dyRef} onBlur={handleParamChange} className='border border-gray-400 px-1 w-12 text-center' />
        </label>
        <label>
          <span className='font-bold mr-2'>r:</span>
          <input type='text' defaultValue={defaultParams.r} ref={rRef} onBlur={handleParamChange} className='border border-gray-400 px-1 w-12 text-center' />
        </label>
      </div>
      <div className='flex flex-wrap gap-4 mt-4'>
        <ControlButton
          onClick={resetAnimation}
        >
          <FontAwesomeIcon icon={faStop} />
        </ControlButton>
        <ControlButton
          onClick={toggleAnimation}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </ControlButton>
        <ControlButton
          onClick={move}
          disabled={isPlaying}
        >
          <FontAwesomeIcon icon={faForwardStep} />
        </ControlButton>
      </div>
      <DisplayParameters
        params={{
          x0:  currentParams.x0,
          y0:  currentParams.y0,
          dx:  currentParams.dx,
          dy:  currentParams.dy,
          cnt: currentParams.cnt,
        }}
      />
      <Accordion>
        <div>注意点</div>
        <div>
          <p>ループ内では「円を描写する→次の描写位置を求める」の順序で処理が行われるため、表示されるパラメータは1つ未来のものであることに注意！</p>
        </div>
    </Accordion>
    </Container>
  )
}