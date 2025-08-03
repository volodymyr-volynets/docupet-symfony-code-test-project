import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.div`
    margin: 1em auto;
    max-width: 600px;
    width: 95%;
    font: 18px/1.5 sans-serif;
    border: 1px solid black;
    border-radius: 5px;
    background: #fff;
    padding: 1em;
`;

const BreedPresetsHolder = styled.div`
    position: relative;
    width: 100%;
`;

const BreedPresetsDiv = styled.div`
    position: absolute;
    width: 100%;
    background: white;
    border: 1px solid black;
`;

const FormWrapperInnerFields = styled.div`
    padding-left: 3em;
`;

const TextSpan = styled.span`
    color: grey;
    font-weight: bold;
`;

const TextSpanSmall = styled.span`
    color: grey;
    font-size: 0.85em;
`;

const A = styled.a`
    color: grey;
    text-decoration: underline;
    cursor: hand;
    cursor: pointer;
`;

const PErrors = styled.p`
    color: red;
`;

export default function (props) {
    const [type, setType] = useState(null);
    const [search, setSearch] = useState(null);
    const [breedExtraOptions, setBreedExtraOptions] = useState(null);
    const nameRef = useRef(null);
    const [breed, setBreed] = useState(null);
    const [mixture, setMixture] = useState(null);
    const [gender, setGender] = useState(null);
    const [isDateOfBirth, setIsDateOfBirth] = useState('No');
    const [approxAge, setApproxAge] = useState(null);
    const [birthDay, setBirthDay] = useState(null);
    const [birthMonth, setBirthMonth] = useState(null);
    const [birthYear, setBirthYear] = useState(null);

    const BreedPresets = ({ breeds }) => {
        const listItems = breeds.slice(0, 10).map(pet => <li key={pet}><A href={void(0)} onClick={() => {setBreed(pet); setSearch(null);}}>{pet}</A></li>);
        return <ul>{listItems}</ul>;
    }

    const filteredBreeds = () => {
        if (!search || !type) {
            return [];
        }
        return Object.values(props.breed_presets[type]).filter((keywords) => {
            return keywords.toLowerCase().includes(search.toLowerCase())
        });
    }

    const isDisabled = () => {
        return !gender || !type || !(breed ||
            breedExtraOptions == 'not_known' || (breedExtraOptions == 'mix' && mixture)) ||
            !isDateOfBirth ||
            (isDateOfBirth == 'Yes' && !(birthDay && birthMonth && birthYear)) ||
            (isDateOfBirth == 'No' && !approxAge);
    }

    return (
        <>
            <FormWrapper className="form-wrapper">
                <img className="form-header" src="/images/header.png" />
                <h1 className="text-indigo-600">Tell us about your Pet</h1>

                <form action="/pet" method="POST">
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <p className="text-red-600">{props.errors}</p>
                            <label className="text-sm">
                                <TextSpan>Pet Type</TextSpan> <span className="text-red-600">*</span>:
                                <select onChange={(event) => {setType(event.target.value); setSearch(null)}} id="type" name="type" required="required" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" data-testid="pet-type">
                                    <option value="">Please Choose</option>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                </select>
                            </label>
                            <label className="text-sm">
                                <TextSpan>Whats your {type} name?</TextSpan> <span className="text-red-600">*</span>
                                <input id="name" type="text" name="name" required="required" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Monte" data-testid="pet-name" />
                            </label>
                            <label className="text-sm">
                                <TextSpan>What breed are they?</TextSpan>
                                <div>
                                    <input ref={nameRef} id="breed" type="text" name="breed" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Cant find it?" value={search ? search : breed} onKeyUp={() => setBreed(null)} onChange={(event) => setSearch(event.target.value)} />
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                                        </svg>
                                    </div>
                                    {(type == 'Dog' || type == 'Cat') && filteredBreeds().length > 0 && (
                                        <>
                                            <BreedPresetsHolder className="mt-3">
                                                <BreedPresetsDiv>
                                                    <BreedPresets breeds={filteredBreeds()} setBreed={setBreed} />
                                                </BreedPresetsDiv>
                                            </BreedPresetsHolder>
                                        </>
                                    )}
                                    {breed && breed.indexOf('(dangerous)') && (
                                        <>
                                            <br/>
                                            <PErrors>
                                                {breed.replace('(dangerous)', '') + ' is considered dangerous.'}
                                            </PErrors>
                                        </>
                                    )}
                                </div>
                            </label>
                            {!breed && (
                                <FormWrapperInnerFields>
                                    <label className="text-sm">
                                        <TextSpan>Choose One</TextSpan>
                                        <div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    id="breed_extra_options_not_known"
                                                    name="breed_extra_options"
                                                    value="not_known"
                                                    checked={breedExtraOptions === 'not_known'}
                                                    onChange={() => setBreedExtraOptions('not_known')}
                                                />
                                                {' '}
                                                <label htmlFor="breed_extra_options_not_known">I don't know</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    id="breed_extra_options_mix"
                                                    name="breed_extra_options"
                                                    value="mix"
                                                    checked={breedExtraOptions === 'mix'}
                                                    onChange={() => setBreedExtraOptions('mix')}
                                                />
                                                {' '}
                                                <label htmlFor="breed_extra_options_mix">It's a mix</label>
                                                {breedExtraOptions == 'mix' && (
                                                    <>
                                                        <br/>
                                                        <input id="mixture" type="text" name="mixture" required="required" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Comma separated list of breeds" onChange={(event) => setMixture(event.target.value)} />
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </label>
                                </FormWrapperInnerFields>
                            )}
                            <label className="text-sm">
                                <TextSpan>What gender are they?</TextSpan> <span className="text-red-600">*</span>:
                                <br />
                                <span className={"px-3 py-2 text-sm " + (gender == 'Female' ? 'bg-cyan-500 text-white outline-2 outline-offset-2 outline-cyan-500' : 'bg-white-500 text-cyan outline-2 outline-cyan-500')} onClick={() => setGender('Female')}>Female</span>
                                {' '}
                                <span className={"px-3 py-2 text-sm " + (gender == 'Male' ? 'bg-cyan-500 text-white outline-2 outline-offset-2 outline-cyan-500' : 'bg-white-500 text-cyan outline-2 outline-cyan-500')} onClick={() => setGender('Male')}>Male</span>
                                <input id="gender" type="hidden" name="gender" value={gender} />
                            </label>
                            <br/>
                            <label className="text-sm">
                                <TextSpan>Do you know their date of birth?</TextSpan> <span className="text-red-600">*</span>:
                                <br />
                                <span className={"px-3 py-2 text-sm " + (isDateOfBirth == 'Yes' ? 'bg-cyan-500 text-white outline-2 outline-offset-2 outline-cyan-500' : 'bg-white-500 text-cyan outline-2 outline-cyan-500')} onClick={() => setIsDateOfBirth('Yes')}>Yes</span>
                                {' '}
                                <span className={"px-3 py-2 text-sm " + (isDateOfBirth == 'No' ? 'bg-cyan-500 text-white outline-2 outline-offset-2 outline-cyan-500' : 'bg-white-500 text-cyan outline-2 outline-cyan-500')} onClick={() => setIsDateOfBirth('No')}>No</span>
                            </label>
                            {isDateOfBirth == 'No' && (
                                <>
                                    <br/>
                                    <label className="text-sm">
                                        <TextSpan>Approximate Age</TextSpan> <span className="text-red-600">*</span>:
                                        <select onChange={(event) => {setApproxAge(event.target.value);}} id="approx_age" name="approx_age" required="required" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" value={approxAge}>
                                            <option value="">Please Choose</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                        </select>
                                    </label>
                                </>
                            )}
                            {isDateOfBirth == 'Yes' && (
                                <>
                                    <br/>
                                    <label className="text-sm">
                                        <TextSpan>Birth</TextSpan> <span className="text-red-600">*</span>:
                                        <br/>
                                        <table>
                                            <tr>
                                                <td width="33%">
                                                    <label className="text-sm">
                                                        <TextSpanSmall>Month</TextSpanSmall>
                                                        <select onChange={(event) => {setBirthMonth(event.target.value);}} required="required" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" value={birthMonth}>
                                                            <option value="">Select</option>
                                                            <option value="1">January</option>
                                                            <option value="2">February</option>
                                                            <option value="3">March</option>
                                                            <option value="4">April</option>
                                                            <option value="5">May</option>
                                                            <option value="6">June</option>
                                                            <option value="7">July</option>
                                                            <option value="8">August</option>
                                                            <option value="9">September</option>
                                                            <option value="10">October</option>
                                                            <option value="11">November</option>
                                                            <option value="12">December</option>
                                                        </select>
                                                    </label>
                                                    <input id="birth_month" type="hidden" name="birth_month" value={birthMonth} />
                                                </td>
                                                <td width="33%">
                                                    <label className="text-sm">
                                                        <TextSpanSmall>Day</TextSpanSmall>
                                                        <input id="birth_day" type="text" name="birth_day" required="required" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="dd" value={birthDay} onChange={(event) => setBirthDay(event.target.value)} />
                                                    </label>
                                                </td>
                                                <td width="34%">
                                                    <label className="text-sm">
                                                        <TextSpanSmall>Year</TextSpanSmall>
                                                        <input id="birth_year" type="text" name="birth_year" required="required" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="yyyy" value={birthYear} onChange={(event) => setBirthYear(event.target.value)} />
                                                    </label>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                    </label>
                                </>
                            )}
                            <br/>
                            <div style={{textAlign: 'center', marginTop: '3em'}}>
                                <button
                                    type="submit"
                                    name="submit_button"
                                    className={"rounded-md bg-cyan-500 px-3 py-2 text-sm text-white shadow-xs hover:bg-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 " + (isDisabled() ? 'opacity-50 cursor-not-allowed' : '')}
                                    disabled={isDisabled()}
                                    value="1"
                                >Continue</button>
                            </div>
                        </div>
                    </div>
                </form>
            </FormWrapper>
        </>
    );
}
