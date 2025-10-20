import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import style from "./ErrorPage.module.css";

function ErrorPage() {
  const copyContainerRef = useRef(null);
  const replayRef = useRef(null);

  useEffect(() => {
    if (!copyContainerRef.current || !replayRef.current) return;

    const p = copyContainerRef.current.querySelector("p");
    const text = p.textContent;
    p.innerHTML = "";

    // Criar spans para cada caractere (exceto espaços)
    const chars = [];
    text.split("").forEach((char) => {
      if (char === " ") {
        p.appendChild(document.createTextNode(char));
      } else {
        const span = document.createElement("span");
        span.textContent = char;
        p.appendChild(span);
        chars.push(span);
      }
    });

    const staggerTime = 0.05;

    // Timeline do texto
    const tlText = gsap.timeline();
    tlText.from(chars, {
      autoAlpha: 0,
      stagger: staggerTime,
      duration: 0.001,
      ease: "back.out(1.7)",
    });

    // Replay click
    const replayClick = () => {
      tlText.restart();
    };
    const replayIcon = replayRef.current;
    if (replayIcon) replayIcon.addEventListener("click", replayClick);

    // Cleanup
    return () => {
      if (replayIcon) replayIcon.removeEventListener("click", replayClick);
    };
  }, []);

  return (
    <div className={style.container}>
      <div
        className={`${style.copyContainer} ${style.centerXY}`}
        ref={copyContainerRef}
      >
        <p>404, page not found.</p>
      </div>

      <svg
        id="cb-replay"
        ref={replayRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 279.9 297.3"
        className={style.replayIcon}
      >
        <g>
          <path
            d="M269.4,162.6c-2.7,66.5-55.6,120.1-121.8,123.9c-77,4.4-141.3-60-136.8-136.9C14.7,81.7,71,27.8,140,27.8
            c1.8,0,3.5,0,5.3,0.1c0.3,0,0.5,0.2,0.5,0.5v15c0,1.5,1.6,2.4,2.9,1.7l35.9-20.7c1.3-0.7,1.3-2.6,0-3.3L148.6,0.3
            c-1.3-0.7-2.9,0.2-2.9,1.7v15c0,0.3-0.2,0.5-0.5,0.5c-1.7-0.1-3.5-0.1-5.2-0.1C63.3,17.3,1,78.9,0,155.4
            C-1,233.8,63.4,298.3,141.9,297.3c74.6-1,135.1-60.2,138-134.3c0.1-3-2.3-5.4-5.3-5.4l0,0C271.8,157.6,269.5,159.8,269.4,162.6z"
          />
        </g>
      </svg>
    </div>
  );
}

export default ErrorPage;
