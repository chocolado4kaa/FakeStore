import { CiDeliveryTruck, CiUndo, CiWarning } from "react-icons/ci";
import { Product } from "../../types/Product";
import styles from "./productinfo.module.scss";

export const MetaInfo = ({ product }: { product: Product }) => {
  return (
    <div className={styles.metaList}>
      <div className={styles.metaItem}>
        <CiDeliveryTruck size={18} />
        {product.shippingInformation}
      </div>
      <div className={styles.metaItem}>
        <CiUndo size={18} />
        {product.returnPolicy}
      </div>
      {product.warrantyInformation && (
        <div className={styles.metaItem}>
          <CiWarning size={18} />
          {product.warrantyInformation}
        </div>
      )}
    </div>
  );
};
