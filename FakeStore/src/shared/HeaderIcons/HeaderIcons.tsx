import "./headericons.scss";

export const BurgerIcon = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
    <rect width="22" height="2" rx="1" fill="currentColor" />
    <rect y="7" width="16" height="2" rx="1" fill="currentColor" />
    <rect y="14" width="10" height="2" rx="1" fill="currentColor" />
  </svg>
);

export const CartIcon = ({ count }: { count: number }) => (
  <>
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
    {count > 0 && <span className="badge">{count > 99 ? "99+" : count}</span>}
  </>
);

export const WishlistIcon = ({ count }: { count: number }) => (
  <>
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
    {count > 0 && <span className="badge">{count}</span>}
  </>
);

export const UserIcon = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
  <>
    {isLoggedIn ?
      <div className="avatar"></div>
    : <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    }
  </>
);
