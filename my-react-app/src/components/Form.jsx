//rfce or rafce used as a starting point
import React, { useState } from 'react'; //imports React library with useState hook
import Button from 'react-bootstrap/Button'; //bootstrap styling
import Card from 'react-bootstrap/Card'; //card bootstrap
import Form from 'react-bootstrap/Form'; //form bootstrap which is placed in the card
//useStateSnippet used as a starting point
const MyForm = () => {   //FUnctional component which has useState declare state variables.
    const [foxImg, setFoxImg] = useState(''); //foxImg is the state variable that will be modified to render fox images by the API call.
    const [email, setEmail] = useState('');// each useState hook is initialized by '' which is an empty string
    const [firstName, setFirstName] = useState(''); //the 'set' portion of the code is the function that update the state (FirstName)
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(0); //setAge updates the age variable. Age is initialized at 0
    const [password, setPassword] = useState('');
    const [birthmonth, setBirthMonth] = useState('');
    const [AboutMe, setAboutMe] = useState(''); //connects to the About me section of code which uses bootstrap styling
    const [userInfo, setUserInfo] = useState(''); //where userinfo is declared

    const fetchFox = async () => { //a GET request. It is asyncronous inorder to allow the API call to work since it is done over a network
        let response = await fetch('https://randomfox.ca/floof/'); //use https instead of just http so that the API call does not cause security issues.
        let data = await response.json(); //await pauses function until async request is complete. JSON = JavaScript Object Notation . This is how the data is parsed
        setFoxImg(data.image); //every update to the state renders a new image of a fox data.image stores the JSOn data
    };

    const handleSubmit = (e) => {  //form submission data.
        e.preventDefault(); //prevents page refreshes. (e) or (event) parameter allows information access
        
           // Check if all required fields are filled upon sumbit. if not an alert box pops up.
    if (!email || !firstName || !lastName || !age || !password || !birthmonth || !AboutMe) { //if field is filled out return User entered info
        alert('Please fill in all required fields.');
        return;
    }

    console.log('User entered info');

        // Data to be put in the card
        const info = `
            First Name: ${firstName}  
            Last Name: ${lastName}
            Age: ${age}
            Email: ${email}
            Password: ${password}
            Birth Month: ${birthmonth}
            About Me: ${AboutMe}
        `;
//in the above placeholders are used to store the entered information on the card in a single string called info using the data entered by the user
        setUserInfo(info); //stores info string in setUserInfo variable

        setEmail(''); //  '' clears input field
        setFirstName(''); //'' clears input field
        setLastName('');//'' clears input field
        setAge(0); //adds a 0 as the starting number. 
        setPassword('');//'' clears input field
        setBirthMonth('');//'' clears input field
    };

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={foxImg} />
                <Card.Body>
                    <Card.Title>Foxes</Card.Title>
                    <Card.Text>   
                        {userInfo && <pre>{userInfo}</pre>}  
                        {/* Where userInfo is conditionally rendered through a submit button using && based on truthfulness. Pre tag =preformatted which allows line breaks. On sumbit button press handlesubmit function is called */}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Foxinfo</Form.Label>
                                <Form.Control
                                    type="email" //requires an email
                                    placeholder="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} //event handleler attached to the emailinput field. e.target.value is the HTML element which is updated by the setEMail function
                                />
                                <Form.Control
                                    type="text" //requires text
                                    placeholder="firstname"
                                    value={firstName} //sets user inputted info as the value
                                    onChange={(e) => setFirstName(e.target.value)} //info is entered on press instead of automatically
                                />
                                <Form.Control
                                    type="text" //requires text
                                    placeholder="lastname"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <Form.Control
                                    type="number" //requires a number
                                    placeholder="age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                                <Form.Control
                                    type="password" //hides what is shown in the text box
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Form.Control
                                    type="text" //requires text
                                    placeholder="birthmonth" //what is displayed in the field first
                                    value={birthmonth}
                                    onChange={(e) => setBirthMonth(e.target.value)} 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>About Me</Form.Label> 
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={AboutMe}
                                    onChange={(e) => setAboutMe(e.target.value)} 
                                    // textarea allows multiline text. Rows are set to 3. 
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={fetchFox}> 
                            {/* calls upon the API data on button press */}
                                Find a Fox
                            </Button>
                            <hr /> 
                            {/* hr tag separates buttons */}
                            <button type="submit">Submit</button>  
                            {/* sumbits form on button press */}
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default MyForm; //exporting makes this code avaliable in other parts of the app