import tw from "tailwind-styled-components";
import Contactform from "../components/Contactform";


function Main() {
    return (
        <Container>

            <h2 className="text-5xl">Buy Me A Ramen 🍜</h2>
            <CardContainer>
                <p className="text-xl">
                    Always a good time for RAMEN!
                </p>
            </CardContainer>

        </Container>
    );
}

const Container = tw.div`
flex
flex-col
font-black
uppercase
text-center
mt-5
mb-2
items-center
justify-center
`;
const CardContainer = tw.div`
flex
mx-auto
justify-center
items-center
font-mono
max-w-screen-lg
w-full

`;
export default Main;