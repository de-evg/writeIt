import { memo } from "react";
import { BackButton } from "../../components/buttons/BackButton/BackButton";

export const Main = memo(() => {
  return (
    <>
      <BackButton />
      <div>Main page</div>
    </>
  );
});
