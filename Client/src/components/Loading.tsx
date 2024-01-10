import { SpinnerIcon } from "./SpinnerIcon"

const Loading = () => {
  return (
    <div role="status" className="m-auto w-fit h-screen grid items-center">
      <div className="m-auto text-center">
      <SpinnerIcon className='m-auto'/>
      <p>Loading...</p>
      </div>
  </div>
  )
}

export default Loading