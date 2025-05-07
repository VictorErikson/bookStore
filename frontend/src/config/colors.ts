export const colors = {
    primary:   "#421862",
    accent:    "#f7e66f",
    warning:   "#d88f00",
    background:"linear-gradient(180deg, #421862 50%, #290c41)",
    button: "#d7355b",
    buttonHover: "#a40035",
  };
  const root = document.documentElement;

root.style.setProperty("--color-primary", "#421862");
root.style.setProperty("--color-accent", "#f7e66f");
root.style.setProperty("--color-warning", "#d88f00");
root.style.setProperty("--color-background", "linear-gradient(180deg, #421862 50%, #290c41)");
root.style.setProperty("--color-button", "#d7355b");
root.style.setProperty("--color-button-hover", "#a40035");

  //style={{ background: colors.background }}