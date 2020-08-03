import React,{useState, useEffect} from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../css/css/profile.css';
import '../css/css/checkbox.css';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { places, countrystates, MakeAvailable } from '../Components/redux/action/index';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import Availablefund from './Availablefund';
import RequestAmount from './RequestAmount';
import LoanTenor from './Loantenor';
import Interest from './Interest';
import OtherVaultInformation from './OtherVaultInformation';
import StepWizard from 'react-step-wizard';
import Borrower from './Borrower';



const SureVault = (props) => 
{
    const { handleSubmit, register, errors } = useForm();
    const dispatch = useDispatch();
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);
    const countries = useSelector(state => state.places.countries);
    const states = useSelector(state => state.places.states);
    const IsFetching = useSelector(state => state.root.IsFetching);
    const onSubmit = async (data, e) => {
        await dispatch(MakeAvailable(data));
        e.target.reset();
    }
    const handleChange = (event) => {
        setisLoadingState(true);
        dispatch(countrystates(event.target.value));
        setisLoadingState(false);
    }

    useEffect(() =>{
        setisLoadingCountries(true);
        dispatch(places());
        setisLoadingCountries(false);
    },[]);
    return(
        <div>
            <ReactNotification />
            <section class="breadcrumb-area bg-img bg-overlay jarallax" style={{backgroundImage: `url('../../img/bg-img/13.jpg')`}}>
                <div class="container h-100">
                    <div class="row h-100 align-items-center">
                        <div class="col-12">
                            <div class="breadcrumb-content">
                                <h2>Sure Vault Creation</h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
           
            <section style={{backgroundColor:'#f1f7f9',padding:20,paddingBottom:40}}>
            <StepWizard initialStep={1}>
                <Availablefund />
                <RequestAmount />
                <LoanTenor />
                <Interest />
                <Borrower />
                <OtherVaultInformation />
            </StepWizard>
               
            </section>
            <Footer />
           
        </div>
        
    );
}

export default SureVault;