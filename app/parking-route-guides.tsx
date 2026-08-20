"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";

export type ParkingRouteStep = {
  image: string;
  preview: string;
  title: string;
  text: string;
  alt: string;
};

export type ParkingRoute = {
  floor: string;
  destination: string;
  summary: string;
  note?: string;
  steps: ParkingRouteStep[];
};

export default function ParkingRouteGuides({ routes }: { routes: ParkingRoute[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [activeRouteIndex, setActiveRouteIndex] = useState<number | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeRoute = activeRouteIndex === null ? null : routes[activeRouteIndex];

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const slider = sliderRef.current;
    if (!dialog || !slider || !activeRoute) return;

    slider.scrollLeft = 0;
    setActiveStepIndex(0);
    if (!dialog.open) dialog.showModal();
  }, [activeRoute]);

  const openRoute = (index: number) => {
    setActiveStepIndex(0);
    setActiveRouteIndex(index);
  };

  const closeRoute = () => {
    dialogRef.current?.close();
    setActiveRouteIndex(null);
  };

  const showStep = (index: number) => {
    if (!activeRoute) return;

    const nextIndex = Math.min(Math.max(index, 0), activeRoute.steps.length - 1);
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollTo({ left: slider.clientWidth * nextIndex, behavior: "smooth" });
    setActiveStepIndex(nextIndex);
  };

  return (
    <>
      <div className="parking-route-choices" aria-label="选择地下停车场路线">
        {routes.map((route, index) => (
          <button
            className="parking-route-choice"
            type="button"
            key={`${route.floor}-${route.destination}`}
            onClick={() => openRoute(index)}
            data-parking-route={index + 1}
            aria-label={`查看${route.floor}前往${route.destination}的路线`}
          >
            <span className="parking-route-choice-copy">
              <small>我在 · {route.floor}</small>
              <strong>前往{route.destination}</strong>
              <span>{route.steps.length} 步 · 查看路线</span>
            </span>
            <i aria-hidden="true">→</i>
          </button>
        ))}
      </div>

      <dialog
        className="parking-route-dialog"
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setActiveRouteIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeRoute();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") showStep(activeStepIndex - 1);
          if (event.key === "ArrowRight") showStep(activeStepIndex + 1);
        }}
      >
        {activeRoute && (
          <div className="parking-route-dialog-panel">
            <header className="parking-route-dialog-heading">
              <div>
                <span>{activeRoute.floor} → {activeRoute.destination} · 左右滑动查看</span>
                <h4 id={titleId}>T3办公电梯厅路线</h4>
                <p>{activeRoute.summary}</p>
              </div>
              <button type="button" onClick={closeRoute} aria-label="关闭停车路线" autoFocus>×</button>
            </header>

            <div
              className="parking-route-slider"
              ref={sliderRef}
              onScroll={(event) => {
                const slider = event.currentTarget;
                if (!slider.clientWidth) return;
                const nextIndex = Math.round(slider.scrollLeft / slider.clientWidth);
                setActiveStepIndex(Math.min(Math.max(nextIndex, 0), activeRoute.steps.length - 1));
              }}
            >
              {activeRoute.steps.map((step, index) => (
                <article className="parking-route-slide" key={`${step.preview}-${step.title}`}>
                  <a
                    className="parking-route-slide-photo"
                    href={step.image}
                    target="_blank"
                    rel="noreferrer"
                    data-lightbox="image"
                    aria-label={`查看步骤${index + 1}清晰原图`}
                  >
                    <img src={step.preview} alt={step.alt} width="1200" height="900" loading="lazy" decoding="async" />
                    <span>查看清晰原图 ↗</span>
                  </a>
                  <div className="parking-route-slide-copy">
                    <span>步骤 {String(index + 1).padStart(2, "0")}</span>
                    <h5>{step.title}</h5>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <footer className="parking-route-dialog-controls">
              <button type="button" onClick={() => showStep(activeStepIndex - 1)} disabled={activeStepIndex === 0} aria-label="上一步">←</button>
              <div className="parking-route-progress" aria-label={`当前第${activeStepIndex + 1}步，共${activeRoute.steps.length}步`}>
                {activeRoute.steps.map((step, index) => (
                  <button
                    type="button"
                    key={step.preview}
                    className={index === activeStepIndex ? "is-active" : ""}
                    onClick={() => showStep(index)}
                    aria-label={`查看第${index + 1}步`}
                    aria-current={index === activeStepIndex ? "step" : undefined}
                  />
                ))}
              </div>
              <span aria-live="polite">{activeStepIndex + 1} / {activeRoute.steps.length}</span>
              <button type="button" onClick={() => showStep(activeStepIndex + 1)} disabled={activeStepIndex === activeRoute.steps.length - 1} aria-label="下一步">→</button>
            </footer>

            {activeRoute.note && <p className="parking-route-dialog-note"><strong>楼层说明</strong>{activeRoute.note}</p>}
          </div>
        )}
      </dialog>
    </>
  );
}
