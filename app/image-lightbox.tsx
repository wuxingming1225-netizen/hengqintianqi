"use client";

import { useEffect, useRef, useState } from "react";

type LightboxImage = {
  src: string;
  alt: string;
  zoom: boolean;
};

export default function ImageLightbox() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [image, setImage] = useState<LightboxImage | null>(null);

  useEffect(() => {
    const openImage = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[data-lightbox="image"]');
      if (!link) return;

      const preview = link.querySelector<HTMLImageElement>("img");
      event.preventDefault();
      setImage({
        src: link.href,
        alt: preview?.alt ?? "清晰原图",
        zoom: link.dataset.lightboxMode === "zoom",
      });
    };

    document.addEventListener("click", openImage);
    return () => document.removeEventListener("click", openImage);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !image || dialog.open) return;
    dialog.showModal();
  }, [image]);

  const close = () => {
    dialogRef.current?.close();
    setImage(null);
  };

  return (
    <dialog
      className={image?.zoom ? "image-lightbox is-zoomable" : "image-lightbox"}
      ref={dialogRef}
      onClose={() => setImage(null)}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <button type="button" onClick={close} aria-label="关闭清晰原图">×</button>
      <div className="image-lightbox-frame">
        {image && <img src={image.src} alt={image.alt} />}
      </div>
    </dialog>
  );
}
