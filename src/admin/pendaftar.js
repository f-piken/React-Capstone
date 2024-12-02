// src/components/AdminPanel.js
import React, { useEffect,useState } from 'react';
import axios from "axios";

const Pendaftar = () => {
    const [pendaftars, setPendaftar] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:3002/pendaftaran')
            .then((response) => setPendaftar(response.data))
            .catch((error) => console.error("Error fetching pendaftaran data:", error));;
    }, []);

    return (
        <div>
            <style>
                {`
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #B4F1F1;
                }
                                
                .admin-panel {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                }
                                
                .header {
                    background-color: #B4F1F1;
                    color: #1E6262;
                    padding: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                                
                .container {
                    padding-top: 100px;
                    display: flex;
                    flex: 1;
                }
                                
                .sidebar {
                    width: 200px;
                    background-color: #1E6262;
                    padding: 15px;
                }
                                
                .sidebar nav ul {
                    list-style-type: none;
                    display : block;
                    padding: 0;
                }
                                
                .sidebar nav ul li {
                    margin: 10px 0;
                }
                                
                .sidebar nav ul li a {
                    color: white;
                    text-decoration: none;
                    padding: 10px;
                    display: block;
                }
                                
                .sidebar nav ul li a:hover {
                    background-color: #409494;
                }
                                
                .main-content {
                    flex: 1;
                    padding: 20px;
                    background-color: #ECFFFB;
                }
                .card {
                    flex: 1;
                    background-color: #B4F1F1;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .card .foto{
                    background-color: #1E6262;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                }
                                
                .user-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                                
                .user-table th, .user-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                                
                .user-table th {
                    background-color: #1E6262;
                    color: white;
                }
                                
                .user-table tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
                                
                .user-table tr:hover {
                    background-color: #ddd;
                }
                                
                .user-table button {
                    background-color: #1E6262;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-right: 5px;
                }
                                
                .user-table button:hover {
                    background-color: #B4F1F1;
                }
                `}
            </style>
        <div className="admin-panel">
            <header className="header">
                <h1>Admin Panel</h1>
                <div className="user-info">
                    <span className="material-icons">account_circle</span>
                    <span>Munet</span>
                </div>
            </header>
            <div className="container">
                <aside className="sidebar">
                    <nav>
                        <ul>
                            <li><a href="/Dashboard">Dashboard</a></li>
                            <li><a href="/Jadwal">Jadwal</a></li>
                            <li><a href="/Pendaftar">Pendaftar</a></li>
                            <li><a href="#">Keuangan</a></li>
                            <li><a href="#">Presensi</a></li>
                            <li><a href="/">Logout</a></li>
                        </ul>
                    </nav>
                </aside>
                <main className="main-content">
                    <h2>Pendaftar</h2>
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NIM</th>
                                <th>Nama</th>
                                <th>Alamat</th>
                                <th>Tempat, Tgl Lahir</th>
                                <th>No. Tlp</th>
                                <th>Email</th>
                                <th>Status Pembayaran</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendaftars.map((daftar) => (
                                <tr key={daftar.id}>
                                    <td>{daftar.id}</td>
                                    <td>{daftar.nama}</td>
                                    <td>{daftar.nilai}</td>
                                    <td>{daftar.alamat}</td>
                                    <td>{daftar.lahir}</td>
                                    <td>{daftar.email}</td>
                                    <td>{daftar.nisn}</td>
                                    <td>{daftar.no}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
        </div>
    );
};

export default Pendaftar;
