export default function ScrollToTop() {
  /* scrollTop */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='wrapper top-button'>
      <button className='button' onClick={scrollToTop}>
        <div className='shadow'></div>
        <span>Top</span>
      </button>
    </div>
  );
}
