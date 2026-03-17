import ContentLoader from "react-content-loader";

export const ProductCardSkeleton = () => (
  <ContentLoader
    speed={1.5}
    width={208}
    height={288}
    viewBox="0 0 208 288"
    backgroundColor="#1e1e1e"
    foregroundColor="#2a2a2a"
    style={{ flexShrink: 0, borderRadius: "1rem", overflow: "hidden" }}
  >
    <rect x="0" y="0" rx="0" ry="0" width="208" height="180" />
    <rect x="14" y="196" rx="4" ry="4" width="160" height="12" />
    <rect x="14" y="214" rx="4" ry="4" width="120" height="12" />
    <rect x="14" y="238" rx="4" ry="4" width="64" height="16" />
    <rect x="14" y="264" rx="4" ry="4" width="48" height="10" />
  </ContentLoader>
);

export const CategoryRowSkeleton = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
    <ContentLoader
      speed={1.5}
      width={300}
      height={32}
      viewBox="0 0 300 32"
      backgroundColor="#1e1e1e"
      foregroundColor="#2a2a2a"
      style={{ marginLeft: "1.75rem" }}
    >
      <rect x="0" y="6" rx="4" ry="4" width="4" height="20" />
      <rect x="16" y="2" rx="4" ry="4" width="180" height="28" />
    </ContentLoader>
    <div
      style={{
        display: "flex",
        gap: "1rem",
        padding: "0.5rem 1.75rem",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </div>
);
