function Button({ children, href, variant = "primary", className = "", ...props }) {
  const base = "inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl transition-all duration-200 cursor-pointer";
  const styles = {
    primary: "bg-lime-400 text-black hover:bg-lime-300 shadow-lg shadow-lime-400/20",
    secondary: "border border-white/10 text-white hover:border-lime-400/50 hover:text-lime-400 bg-white/5",
  };
  const cls = `${base} ${styles[variant]} ${className}`;

  if (href) return <a data-gsap-hover href={href} className={cls} {...props}>{children}</a>;
  return <button data-gsap-hover className={cls} {...props}>{children}</button>;
}

export default Button;
