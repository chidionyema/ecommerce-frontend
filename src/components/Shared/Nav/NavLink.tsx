;

import { useNavigation } from '../../../contexts/NavigationContext';
import { Spinner } from '../Spinner';

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  prefetch?: boolean;
  children: React.ReactNode;
}

export const NavLink = ({
  href,
  prefetch = false,
  children,
  ...props
}: NavLinkProps) => {
 

  const handleClick = (e: React.MouseEvent) => {
  
    
    e.preventDefault();
   
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="relative transition-opacity hover:opacity-80"
      {...props}
    >
      {children}
      {(
        <span className="absolute right-0 top-1/2 -translate-y-1/2">
          <Spinner size={16} />
        </span>
      )}
    </a>
  );
};