import React from 'react'

const layout = ({children}) => {
  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-[35%]">{children}</div>
    </section>
  );
}

export default layout