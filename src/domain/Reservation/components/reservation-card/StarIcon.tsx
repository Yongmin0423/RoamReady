interface StarIconProps {
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

const StarIcon = ({
  className,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...props
}: StarIconProps) => (
  <svg
    width={42}
    height={42}
    viewBox='0 0 42 42'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    {...props}
  >
    <path d='M18.7706 5.33711C19.7977 3.68516 22.202 3.68516 23.2291 5.33711L27.472 12.1613C27.8334 12.7425 28.4075 13.1596 29.0719 13.3237L36.8732 15.2501C38.7617 15.7165 39.5047 18.0031 38.251 19.4904L33.0719 25.6345C32.6308 26.1578 32.4116 26.8326 32.4608 27.5153L33.0394 35.5301C33.1794 37.4702 31.2343 38.8834 29.4324 38.1507L21.9886 35.1238C21.3546 34.866 20.645 34.866 20.011 35.1238L12.5673 38.1507C10.7654 38.8834 8.82025 37.4702 8.9603 35.5301L9.53883 27.5153C9.58811 26.8326 9.36882 26.1578 8.92772 25.6345L3.74871 19.4904C2.495 18.0031 3.23797 15.7165 5.12646 15.2501L12.9277 13.3237C13.5922 13.1596 14.1663 12.7425 14.5277 12.1613L18.7706 5.33711Z' />
  </svg>
);

export default StarIcon;
