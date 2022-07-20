import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import useAuth from './tools/auth'
import { DataPrivacy } from './views/DataPrivacy/DataPrivacy'
import { Funnel } from './views/Funnel'
import { Home } from './views/Home'
import Connect from './views/Home/Connect'
import { Feed } from './views/Home/Feed'
import { PartnerCodes } from './views/Home/PartnerCodes'
import { PostCreator } from './views/Home/PostCreator'
import { Services } from './views/Home/Services'
import { Impressum } from './views/Impressum/Impressum'
import { Signin } from './views/Signin'
import { Signup } from './views/Signup'
import { TermsOfService } from './views/TermsOfService/TermsOfService'

function App() {

  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Funnel />} />
        <Route path="/" element={<RequiresAuth><Home /></RequiresAuth>}>
          <Route index element={<Feed />} />
          <Route path="discover" element={<Feed />} />
          <Route path="connect" element={<Connect />} />
          <Route path="invite" element={<PartnerCodes />} />
          <Route path="services" element={<Services />} />
          <Route path="create-post" element={<PostCreator />} />
        </Route>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<Home />}>
          <Route path="data-privacy" element={<DataPrivacy />} />
          <Route path="impressum" element={<Impressum />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
}

const RequiresAuth: FC<{}> = ({ children }) => {
  const auth = useAuth();
  let location = useLocation();

  return <>
    {!auth.jwt && <Navigate to="/welcome" state={{ from: location }} replace></Navigate>}
    {children}
  </>
}

export default App
