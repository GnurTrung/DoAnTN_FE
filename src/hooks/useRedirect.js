const { useNavigate } = require("react-router-dom")

const useRedirect = () => {
    const navigate = useNavigate()
    const redirectToPage = (page) => navigate(page)

    return { redirectToPage }
}

export default useRedirect;