import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clearCart } from "@features/cart/api/cartThunks";
import { selectUser } from "@features/auth/authSelectors";
import { InputText } from "@shared/components/InputText/InputText";
import { CiUser, CiMail, CiPhone, CiLocationOn, CiMap } from "react-icons/ci";
import styles from "./CheckoutPage.module.scss";
import { useCart } from "@/features/cart/hooks/Usecart";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { Title } from "@/shared/components/Title/Title";
import {
  CheckoutFormValues,
  checkoutSchema,
} from "@/features/cart/api/CheckoutSchema";
import { CartProduct } from "@/features/cart/types/cart";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, total, count } = useCart();
  const user = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      address: user?.address?.address ?? "",
      city: user?.address?.city ?? "",
      zip: user?.address?.postalCode ?? "",
      country: user?.address?.country ?? "",
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    const orderData = {
      shipping: values,
      items: products.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        quantity: p.quantity,
        total: p.total,
      })),
      total,
      orderedAt: new Date().toISOString(),
    };

    console.log("📦 Order submitted:", orderData);
    alert(formatOrderAlert(values, products, total));

    await dispatch(clearCart());
    navigate("/");
  };

  if (count === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Title>Checkout</Title>
        <div className={styles.content}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Personal Info</legend>
              <div className={styles.row}>
                <InputText
                  label="First Name"
                  icon={<CiUser size={16} />}
                  error={errors.firstName?.message}
                  {...register("firstName")}
                />
                <InputText
                  label="Last Name"
                  icon={<CiUser size={16} />}
                  error={errors.lastName?.message}
                  {...register("lastName")}
                />
              </div>
              <InputText
                label="Email"
                type="email"
                icon={<CiMail size={16} />}
                error={errors.email?.message}
                {...register("email")}
              />
              <InputText
                label="Phone"
                type="tel"
                icon={<CiPhone size={16} />}
                error={errors.phone?.message}
                {...register("phone")}
              />
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Shipping Address</legend>
              <InputText
                label="Address"
                icon={<CiLocationOn size={16} />}
                error={errors.address?.message}
                {...register("address")}
              />
              <div className={styles.row}>
                <InputText
                  label="City"
                  icon={<CiMap size={16} />}
                  error={errors.city?.message}
                  {...register("city")}
                />
                <InputText
                  label="ZIP"
                  icon={<CiMap size={16} />}
                  error={errors.zip?.message}
                  {...register("zip")}
                />
              </div>
              <InputText
                label="Country"
                icon={<CiLocationOn size={16} />}
                error={errors.country?.message}
                {...register("country")}
              />
            </fieldset>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ?
                <span className={styles.spinner} />
              : "Confirm Order"}
            </button>
          </form>

          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Your Order</h2>
            <div className={styles.summaryItems}>
              {products.map((p) => (
                <div key={p.id} className={styles.summaryItem}>
                  <img src={p.thumbnail} alt={p.title} />
                  <div className={styles.summaryItemInfo}>
                    <span className={styles.summaryItemTitle}>{p.title}</span>
                    <span className={styles.summaryItemQty}>x{p.quantity}</span>
                  </div>
                  <span className={styles.summaryItemTotal}>
                    ${p.total.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const formatOrderAlert = (
  values: CheckoutFormValues,
  products: CartProduct[],
  total: number,
): string => {
  const items = products
    .map((p) => `  • ${p.title} × ${p.quantity} — $${p.total.toFixed(2)}`)
    .join("\n");

  return [
    `✅ Thank you for your order, ${values.firstName}!`,
    ``,
    `📦 ORDER SUMMARY`,
    `─────────────────────────────`,
    items,
    `─────────────────────────────`,
    `Total: $${total.toFixed(2)}`,
    ``,
    `🚚 SHIPPING`,
    `${values.firstName} ${values.lastName}`,
    `${values.address}, ${values.city} ${values.zip}`,
    `${values.country}`,
    ``,
    `📬 CONTACTS`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
  ].join("\n");
};
