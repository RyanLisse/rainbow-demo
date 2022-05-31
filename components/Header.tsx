import { ConnectButton } from "@rainbow-me/rainbowkit";
import tw from "tailwind-styled-components";

function Header() {
    return (
        <Container>
            <HeaderContainer>
                <ConnectButton />
            </HeaderContainer>


        </Container>
    );
}

const Container = tw.div`
flex
justify-end
p-4


`;
const HeaderContainer = tw.div`


`;
export default Header;