import { ReactNode } from 'react';

/**
 * @component AppLayout
 * @description
 * 메인 애플리케이션의 공통 레이아웃을 정의하는 컴포넌트입니다.
 * 모든 페이지에 걸쳐 일관된 UI(헤더, 푸터)를 제공하며,
 * `AuthStatusProvider`를 통해 사용자 인증 상태를 관리하고 하위 컴포넌트에 제공합니다.
 *
 * 이 컴포넌트는 전체 페이지의 최소 높이를 설정하고, 콘텐츠 영역에 반응형 패딩 및 최대 너비를 적용합니다.
 *
 * @param {AppLayoutProps} props - 컴포넌트의 props입니다.
 * @param {ReactNode} props.children - 이 레이아웃 내부에 렌더링될 자식 요소입니다.
 *
 * @returns {JSX.Element} 헤더, 콘텐츠 영역(AuthStatusProvider 포함), 푸터로 구성된 React 요소입니다.
 */
export default function ActivityDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className='mx-auto w-full max-w-1200 flex-1 px-24 py-20'>
      {children}
    </main>
  );
}
