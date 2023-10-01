interface PropsType {
  iconStatus: boolean;
}

const Expand = ({ iconStatus }: PropsType) => {
  return iconStatus ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19" stroke="#323E54" stroke-linecap="round" stroke-linejoin="round" />
  </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 9L12 15L18 9" stroke="#323E54" stroke-linecap="round" stroke-linejoin="round" />
  </svg>;
};

export default Expand;
