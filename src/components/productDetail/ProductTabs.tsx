import { useEffect, useRef } from 'react';
import '../../styles/productDetail/productTabs.scss';
import Review from './Review';
import Inquire from './Inquire';
import ProductsStyling from './ProductStyling';
import { useLocation } from 'react-router-dom';
import ProductInfo, { DeliveryInfo } from './ProductInfo';

interface ScrollToTopProps {
  children: React.ReactNode;
}

export function ScrollToTop(props: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('Scrolling to top');
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{props.children}</>;
}

export default function ProductTabs() {
  const content1Ref = useRef<HTMLDivElement>(null);
  const content2Ref = useRef<HTMLDivElement>(null);
  const content3Ref = useRef<HTMLDivElement>(null);
  const content4Ref = useRef<HTMLDivElement>(null);

  const onContent1Click = () => {
    content1Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const onContent2Click = () => {
    content2Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const onContent3Click = () => {
    content3Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const onContent4Click = () => {
    content4Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <ScrollToTop>
      <div id='navZone'>
        <nav id='detailNav'>
          <div onClick={onContent1Click} role='none'>
            상품정보
          </div>
          <div onClick={onContent2Click} role='none'>
            배송/환불
          </div>
          <div onClick={onContent3Click} role='none'>
            리뷰
          </div>
          <div onClick={onContent4Click} role='none'>
            문의하기
          </div>
        </nav>
        {/* style={{ border: '3px solid salmon' }} */}
        <div ref={content1Ref}>
          <ProductsStyling />
          <ProductInfo />
        </div>
        <div ref={content2Ref}>
          <DeliveryInfo />
        </div>
        <div ref={content3Ref}>
          <Review />
        </div>
        <div ref={content4Ref}>
          <Inquire />
        </div>
      </div>
    </ScrollToTop>
  );
}
