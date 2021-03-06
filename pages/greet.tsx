import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { observer } from 'mobx-react-lite';
import { app } from '../src/app';
import { GreetContract } from '../src/app/contracts/GreetContract';
import { useState } from 'react';

const Greet = observer(() => {
    const [newGreeting, setNewGreeting] = useState('');
    const [contract, setContract] = useState<GreetContract | null>(null);

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app Generated by create next app Generated by create next app Generated by create next app Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex">
                <button
                    onClick={() =>
                        app
                            .connect()
                            .then((provider) =>
                                setContract(new GreetContract(provider))
                            )
                    }
                    className="bg-blue-300 p-3 rounded-xl border-blue-600 border-solid border w-200 m-3 focus:outline-none"
                >
                    Connect wallet
                </button>
                <div>
                    <h2>{app.isConnected ? 'Connected' : 'Not connected'}</h2>
                    <p>Address: {app.address}</p>
                    <p>Balance: {app.balance}</p>
                    <p>Blocks: {app.blocks}</p>
                </div>
            </div>

            <main className={styles.main}>
                <div>
                    <button
                        onClick={() => {
                            console.log('fecth', contract);
                            contract?.greet();
                        }}
                        className="bg-blue-500 p-2"
                    >
                        Fetch greeting
                    </button>
                    <h4 className="h-4 font-bold m-3">
                        Greeting: {contract?.greeting}
                    </h4>
                    <div>
                        <input
                            type="text"
                            value={newGreeting}
                            onChange={(e) => setNewGreeting(e.target.value)}
                            className="bg-yellow-100"
                        />
                        <button
                            onClick={() => contract?.setGreet(newGreeting)}
                            className="bg-blue-500 p-2"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
});

export default Greet;
