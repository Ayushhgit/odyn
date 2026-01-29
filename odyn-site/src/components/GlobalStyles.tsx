"use client";

export function GlobalStyles() {
    return (
        <>
            <style jsx global>{`
        :root {
          --bg:#060608;
          --muted:#94a3b8;
          --glass: rgba(255,255,255,0.03);
          --accent1: #7c3aed;
          --accent2: #06b6d4;
        }
        html,body,#__next {height:100%}
        body {background:var(--bg);font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Helvetica Neue",Arial}
        .glass {background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));backdrop-filter: blur(6px);}
        .soft-shadow {box-shadow:0 6px 30px rgba(0,0,0,0.6)}
      `}</style>
        </>
    );
}
