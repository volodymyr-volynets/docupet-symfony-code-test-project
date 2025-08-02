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

const A = styled.a`
    color: grey;
    text-decoration: underline;
    cursor: hand;
    cursor: pointer;
`;

export default function (props) {
    const [type, setType] = useState(null);
    const [search, setSearch] = useState(null);
    const [breedExtraOptions, setBreedExtraOptions] = useState(null);
    const nameRef = useRef(null);
    const [breed, setBreed] = useState(null);

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
                                <select onChange={(event) => {setType(event.target.value); setSearch(null)}} id="type" name="type" required="required" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                    <option value="">Please Choose</option>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                </select>
                            </label>
                            <br/>
                            <label className="text-sm">
                                <TextSpan>Whats your {type}? name</TextSpan> <span className="text-red-600">*</span>
                                <input id="name" type="text" name="name" required="required" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Monte" />
                            </label>
                            <label className="text-sm">
                                <TextSpan>What breed are they?</TextSpan>
                                <div>
                                    <input ref={nameRef} id="name" type="text" name="name" required="required" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Cant find it?" value={search ? search : breed} onKeyUp={() => setBreed(null)} onChange={(event) => setSearch(event.target.value)} />
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
                                                        <input id="name" type="text" name="name" required="required" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Comma separated list of breeds" />
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </label>
                                </FormWrapperInnerFields>
                            )}
                            <br/>
                            <div style={{textAlign: 'center', marginTop: '3em'}}>
                                <button type="submit" name="submit_button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Continue</button>
                            </div>
                        </div>
                    </div>
                </form>
            </FormWrapper>
        </>
    );
}
