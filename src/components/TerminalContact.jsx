import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(TextPlugin);

export default function TerminalContact() {
    const sectionRef = useRef(null);
    const inputRef = useRef(null);
    const promptRef = useRef(null);
    const bottomRef = useRef(null);
    const transmitRef = useRef(null);

    const terminalSteps = [
        { id: "INIT", prompt: "> SYSTEM: Secure connection established with Karan. Identify yourself." },
        { id: "SCOPE", prompt: "> DEFINE_SCOPE: Brand Identity, Web Dev, AI Motion, or Inquiry?" },
        { id: "EMAIL", prompt: "> TRANSMIT: Provide your comm link (email)." },
        { id: "PHONE", prompt: "> TRANSMIT: Provide secondary comm link (phone)." },
        { id: "END", prompt: "> SYSTEM: Payload received. I will review the logs. Terminating connection." }
    ];

    const [step, setStep] = useState(0);
    const [history, setHistory] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [error, setError] = useState(false);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 50%",
            onEnter: () => {
                if (window.innerWidth > 768 && inputRef.current && !isTransmitting && step < terminalSteps.length - 1) {
                    inputRef.current.focus();
                }
            }
        });
    }, { scope: sectionRef });
    // Add a ref to track initial mount
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current && bottomRef.current) {
            // Use block: 'nearest' to prevent aggressive jumping
            bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            isMounted.current = true;
        }
    }, [step, isTransmitting, error]);

    // GSAP Typewriter & Transmitting Engine
    useGSAP(() => {
        if (isTransmitting) {
            const transmitTween = gsap.to(transmitRef.current, {
                text: "> TRANSMITTING PAYLOAD [////////]",
                duration: 1,
                ease: "none",
                repeat: -1,
                yoyo: true
            });

            // Physically kill the infinite loop when state changes
            return () => transmitTween.kill();
        }

        if (step >= terminalSteps.length || error) return;

        // Normal Prompt Typing
        setIsTyping(true);
        const currentPrompt = terminalSteps[step].prompt;

        gsap.fromTo(promptRef.current,
            { text: "" },
            {
                text: currentPrompt,
                duration: currentPrompt.length * 0.03,
                ease: "none",
                onComplete: () => setIsTyping(false)
            }
        );
    }, { dependencies: [step, isTransmitting, error], scope: sectionRef });

    // The State Machine & EmailJS Bridge
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (isTyping || isTransmitting || (!inputValue.trim() && step < terminalSteps.length - 1)) return;

            // Intercept the final step for network transmission
            if (step === terminalSteps.length - 2) {
                const finalNum = inputValue;
                setIsTransmitting(true);
                setInputValue(""); // Clear visually during freeze

                const payload = {
                    name: history[0]?.answer,
                    scope: history[1]?.answer,
                    email: history[2]?.answer, // Now extracts from history
                    phone: finalNum
                };

                emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                    payload,
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                ).then(() => {
                    // 200 OK: Advance to termination
                    setHistory(prev => [...prev, { prompt: terminalSteps[step].prompt, answer: finalNum }]);
                    setIsTransmitting(false);
                    setStep(prev => prev + 1);
                }).catch((err) => {
                    // 500 FAIL: Kill process
                    console.error("Transmission failed:", err);
                    setIsTransmitting(false);
                    setError(true);
                });

            } else {
                // Normal Step Progression
                setHistory(prev => [...prev, { prompt: terminalSteps[step].prompt, answer: inputValue }]);
                setInputValue("");
                setStep(prev => prev + 1);
            }
        }
    };

    const isComplete = step >= terminalSteps.length - 1;

    return (
        <section ref={sectionRef} className="cli-section" >

            {!isComplete && !isTransmitting && !error && (
                <input
                    ref={inputRef}
                    type="text"
                    className="ghost-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    spellCheck="false"
                    autoCorrect="off"
                    autoCapitalize="off"
                    data-form-type="other"
                    data-1p-ignore="true"
                />
            )}

            {/* Add onClick to the main container */}
            <div className="cli-container max-w-4xl mx-auto" onClick={() => inputRef.current?.focus()}>
                {/* Historical Logs */}
                <div className="cli-history">
                    {history.map((log, index) => (
                        <div key={index} className="cli-row">
                            <span className="cli-prompt">{log.prompt}</span>
                            <span className="cli-answer">{log.answer}</span>
                        </div>
                    ))}
                </div>

                {/* Active States */}
                {error ? (
                    <div key="state-error" className="cli-active-line text-red-500">
                        <span>&gt; SYSTEM_ERR: Transmission failed. Reload environment.</span>
                    </div>
                ) : isTransmitting ? (
                    <div key="state-transmit" className="cli-active-line text-yellow-500">
                        <span ref={transmitRef}>&gt; TRANSMITTING PAYLOAD [///]</span>
                    </div>
                ) : step < terminalSteps.length && (
                    <div key={`state-prompt-${step}`} className="cli-active-line">
                        <span ref={promptRef} className="cli-prompt"></span>
                        {!isTyping && !isComplete && (
                            <span className="cli-answer">{inputValue}</span>
                        )}
                        {!isComplete && <span className="cli-cursor"></span>}
                    </div>
                )}

                <div ref={bottomRef} className="h-10" />
            </div>
            <div className="cli-info">
                <h2 className='text-white uppercase'>get in touch</h2>
            </div>
        </section>
    );
}