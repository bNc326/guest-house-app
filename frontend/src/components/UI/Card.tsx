const Card: React.FC<{
  title?: string;
  range?: number;
  color?: string;
  order?: boolean;
}> = (props) => {
  return (
    <>
      <div
        className={`flex flex-col justify-center w-full  tablet:w-1/3 order-1 ${props.order ? `mobile:order-3 mobile:basis-full tablet:basis-[unset] tablet:order-1` : 'mobile:w-[calc(50%-1.5rem/2)]'} items-center shadow-shadow rounded-3xl py-10 tall:py-12 ${props.color}`}
      >
        <h2 className="font-normal text-palette-4 text-dynamicTitle3">
          {props.title}
        </h2>
        <p
          className={
            "font-bold text-palette-4 text-dynamicTitle uppercase"
          }
        >
          {props.range} km
        </p>
      </div>
    </>
  );
};

export default Card;
