import React, { useRef, useContext } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingContext } from '../components/LoadingContext';

gsap.registerPlugin(ScrollTrigger);

export default function Canvas({ setTl }) {
    const canvasEl = useRef(null);
    const setIsLoaded = useContext(LoadingContext);

    useGSAP(() => {
        const canvas = canvasEl.current;
        if (!canvas) return;
        ScrollTrigger.normalizeScroll(true);
        let resizeHandler;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');

        // The Mathematical Crop Engine
        const renderFrames = (index, images) => {
            const img = images[index];
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;
            let renderWidth, renderHeight, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                renderWidth = canvas.width;
                renderHeight = canvas.width / imgRatio;
                offsetX = 0;
                offsetY = (canvas.height - renderHeight) / 2;
            } else {
                renderWidth = canvas.height * imgRatio;
                renderHeight = canvas.height;
                offsetX = (canvas.width - renderWidth) / 2;
                offsetY = 0;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
        };

        // Stage 1: Load Hero Frame
        const loadInitialFrame = () => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = new URL(`../assets/landingImages/1.webp`, import.meta.url).href;
                img.decode().then(() => resolve(img)).catch(() => resolve(img));
            });
        };

        // Stage 2: Load Background Sequence
        const loadRemainingFrames = (firstImg) => {
            const promises = [];
            for (let i = 2; i <= 82; i++) {
                promises.push(new Promise((resolve) => {
                    const img = new Image();
                    img.src = new URL(`../assets/landingImages/${i}.webp`, import.meta.url).href;
                    img.decode().then(() => resolve(img)).catch(() => resolve(img));
                }));
            }
            return Promise.all(promises).then(rest => [firstImg, ...rest]);
        };

        // Execution Chain
        loadInitialFrame().then((firstImg) => {
            renderFrames(0, [firstImg]);
            let animation = { frame: 0 };
            const landingTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.landing',
                    start: 'top -1px',
                    end: '+=1500',
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1
                }
            });
            setTl(landingTl);
            setIsLoaded(true);
            setTimeout(() => ScrollTrigger.refresh(), 50);

            loadRemainingFrames(firstImg).then((allImages) => {

                landingTl.to(animation, {
                    frame: allImages.length - 1,
                    snap: 'frame',
                    onUpdate: () => renderFrames(animation.frame, allImages)
                }, 0);

                let currentWidth = window.innerWidth;
                resizeHandler = () => {
                    if (window.innerWidth !== currentWidth) {
                        currentWidth = window.innerWidth;
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;
                        renderFrames(Math.round(animation.frame), allImages);
                        ScrollTrigger.refresh();
                    }
                };

                window.addEventListener('resize', resizeHandler);

                ScrollTrigger.refresh();
            });
        });

        // Cleanup Lifecycle
        return () => {
            if (resizeHandler) window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return <canvas ref={canvasEl} className="block w-full max-w-full overflow-hidden"></canvas>;
}