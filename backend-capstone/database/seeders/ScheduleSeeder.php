<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScheduleSeeder extends Seeder
{
    public function run()
    {
        DB::table('schedules')->insert([
            [
                'nama' => 'Budi Santoso',
                'alamat' => 'Jl. Kenangan No. 12',
                'ttl' => 'Surabaya, 01 Januari 2000',
                'noTlp' => '081234567890',
                'email' => 'budi@example.com',
                'statusPembayaran' => 'Lunas',
            ],
            [
                'nama' => 'Ani Wulandari',
                'alamat' => 'Jl. Mawar No. 23',
                'ttl' => 'Malang, 15 Februari 1999',
                'noTlp' => '081234567891',
                'email' => 'ani@example.com',
                'statusPembayaran' => 'Belum Lunas',
            ],
            [
                'nama' => 'Citra Dewi',
                'alamat' => 'Jl. Melati No. 45',
                'ttl' => 'Bandung, 21 Maret 1998',
                'noTlp' => '081234567892',
                'email' => 'citra@example.com',
                'statusPembayaran' => 'Lunas',
            ],
        ]);
    }
}
