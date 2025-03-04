interface ColorScheme {
  primary: string;
  secondary: string;
  text: {
    primary: string;
    secondary: string;
    light: string;
  };
  background: {
    light: string;
    main: string;
    dark: string;
  };
  border: string;
  success: string;
  warning: string;
  error: string;
}

const colors: ColorScheme = {
  primary: '#0066ff',
  secondary: '#8c9eff',
  text: {
    primary: '#172b4d',
    secondary: '#6b778c',
    light: '#8993a4',
  },
  background: {
    light: '#f4f5f7',
    main: '#ffffff',
    dark: '#eaeaea',
  },
  border: '#e3e3e3',
  success: '#36b37e',
  warning: '#ffab00',
  error: '#ff5630',
};

export default colors;
