@extends('layouts.dashboard')

@section('title', 'Module Users: Larapets 🐻‍❄️')

@section( 'content')
<h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutral-50 mb-10">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
                <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
                </svg>
    Module Users
</h1>

<div class="overflow-x-auto rounded-box text-white bg-[#0009]">
    <table class="table">
        <!-- head -->
        <thead>
            <tr class="text-white text-center bg-black/40">
                <th>Id</th>
                <th>Document</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($users as $user)
            <tr>
                <td>{{ $user->id }}</td>
                <td>{{ $user->document }}</td>
                <td>{{ $user->fullname}}</td>
                <td>{{ $user->email }}</td>

                <td>
                    <a href="">Show</a>
                    <a href="">Edit</a>
                    <a href="">Delete</a>
                </td>
            </tr>
            @endforeach
            <tr>
                <td colspan="5">{{ $users->links() }}</td>
            </tr>

        </tbody>
    </table>
</div>
@endsection