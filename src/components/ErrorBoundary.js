import React from "react"
import img404 from 'assets/images/404.png'
import Image from "components/ProgressiveImage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    // if (process.env.NODE_ENV != 'development') {
    //   setTimeout(() => { window.location.reload() }, 500)
    // }
    //setTimeout(() => { window.location.reload() }, 500)
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
              <div className="relative">
                <div className="absolute">
                  <div className="">
                    <h1 className="my-2 text-gray-800 font-semibold text-2xl">
                      Looks like GnurT Team just update a new version
                    </h1>
                    <p className="my-2 text-gray-800">Sorry about that! Please reload or go to homepage to get where you need to go.</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white bg-indigo-700 outline-none ring-2 ring-indigo-700 ring-opacity-50">
                      Reload
                    </button>

                  </div>
                </div>

              </div>
            </div>
            <div>
              <Image src={img404} />
            </div>
          </div>
        </div>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary