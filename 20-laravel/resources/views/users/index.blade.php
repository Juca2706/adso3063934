@extends('layouts.dashboard')

@section('title', 'Module Users: Larapets 🐻‍❄️')

@section( 'content')
<h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutral-50 mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
        <path
            d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z">
        </path>
    </svg>
    Module Users
</h1>

{{-- Options --}}
<div class="join mx-auto">
    <a class="btn btn-outline btn-warning join-item" href="{{ url('users/create') }}">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M256,136a8,8,0,0,1-8,8H232v16a8,8,0,0,1-16,0V144H200a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,256,136Zm-57.87,58.85a8,8,0,0,1-12.26,10.3C165.75,181.19,138.09,168,108,168s-57.75,13.19-77.87,37.15a8,8,0,0,1-12.25-10.3c14.94-17.78,33.52-30.41,54.17-37.17a68,68,0,1,1,71.9,0C164.6,164.44,183.18,177.07,198.13,194.85ZM108,152a52,52,0,1,0-52-52A52.06,52.06,0,0,0,108,152Z">
            </path>
        </svg>
        <span class="hidden md:inline">
            Add User
        </span>
    </a>

    <a class="btn btn-outline btn-error join-item" href="{{ url('export/users/pdf') }}">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM92,172a28,28,0,0,1-28,28H56v8a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8H64A28,28,0,0,1,92,172Zm-16,0a12,12,0,0,0-12-12H56v24h8A12,12,0,0,0,76,172Zm88,8a36,36,0,0,1-36,36H112a8,8,0,0,1-8-8V152a8,8,0,0,1,8-8h16A36,36,0,0,1,164,180Zm-16,0a20,20,0,0,0-20-20h-8v40h8A20,20,0,0,0,148,180ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.69L160,51.31Z">
            </path>
        </svg>
        <span class="hidden md:inline">
            Export
        </span>
    </a>

    <a class="btn btn-outline btn-success join-item" href="{{ url('export/users/excel') }}">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M156,208a8,8,0,0,1-8,8H120a8,8,0,0,1-8-8V152a8,8,0,0,1,16,0v48h20A8,8,0,0,1,156,208ZM92.65,145.49a8,8,0,0,0-11.16,1.86L68,166.24,54.51,147.35a8,8,0,1,0-13,9.3L58.17,180,41.49,203.35a8,8,0,0,0,13,9.3L68,193.76l13.49,18.89a8,8,0,0,0,13-9.3L77.83,180l16.68-23.35A8,8,0,0,0,92.65,145.49Zm98.94,25.82c-4-1.16-8.14-2.35-10.45-3.84-1.25-.82-1.23-1-1.12-1.9a4.54,4.54,0,0,1,2-3.67c4.6-3.12,15.34-1.72,19.82-.56a8,8,0,0,0,4.07-15.48c-2.11-.55-21-5.22-32.83,2.76a20.58,20.58,0,0,0-8.95,14.95c-2,15.88,13.65,20.41,23,23.11,12.06,3.49,13.12,4.92,12.78,7.59-.31,2.41-1.26,3.33-2.15,3.93-4.6,3.06-15.16,1.55-19.54.35A8,8,0,0,0,173.93,214a60.63,60.63,0,0,0,15.19,2c5.82,0,12.3-1,17.49-4.46a20.81,20.81,0,0,0,9.18-15.23C218,179,201.48,174.17,191.59,171.31ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,1,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.68L160,51.31Z">
            </path>
        </svg>
        <span class="hidden md:inline">
            Export
        </span>
    </a>

    <a class="btn btn-outline btn-success join-item" href="{{ url('import/users/excel') }}">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-42.34-77.66a8,8,0,0,1-11.32,11.32L136,139.31V184a8,8,0,0,1-16,0V139.31l-10.34,10.35a8,8,0,0,1-11.32-11.32l24-24a8,8,0,0,1,11.32,0Z">
            </path>
        </svg>
        <span class="hidden md:inline">
            Import
        </span>
    </a>
</div>

{{-- Search --}}
<label class="input text-white bg-[#0009] outline-none mb-2">
    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
        </g>
    </svg>
    <input type="search" placeholder="Search..." name="qsearch" />
</label>

<div class="overflow-x-auto rounded-box text-white bg-[#0009]">
    <table class="table">
        <!-- head -->
        <thead>
            <tr class="text-white text-center bg-black/80">
                <th class="hidden md:table-cell">Id</th>
                <th>Photo</th>
                <th class="hidden md:table-cell">Document</th>
                <th>Full Name</th>
                <th class="hidden md:table-cell">Role</th>
                <th class="hidden md:table-cell">Active</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($users as $user)
            <tr @if($user->id % 2 == 0) class="bg-[#0006]" @endif>
                <td class="hidden md:table-cell">{{ $user->id }}</td>
                <td>
                    <div class="avatar">
                        <div class="w-12 rounded-full">
                            <img src="{{ asset('images/'. $user->photo) }}" />
                        </div>
                    </div>
                </td>
                <td class="hidden md:table-cell">{{ $user->document }}</td>
                <td>{{ $user->fullname}}</td>
                <td class="hidden md:table-cell">
                    @if($user->role == 'Administrador')
                    <div class="badge badge-outline badge-warning">Admin</div>
                    @else
                    <div class="badge badge-outline badge-accent">Customer</div>
                    @endif
                </td>
                <td class="hidden md:table-cell">
                    @if($user->active == 1)
                    <div class="badge badge-outline badge-success">Active</div>
                    @else
                    <div class="badge badge-outline badge-error">Inactive</div>
                    @endif
                </td>

                <td>
                    <a href="{{ url('users/'. $user->id) }}"
                        class="btn  btn-outline btn-accent btn-xs rounded-full p-3 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z">
                            </path>
                        </svg>
                    </a>

                    <a href="{{ url('users/'. $user->id. '/edit') }}"
                        class="btn btn-outline btn-warning btn-xs rounded-full p-3 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z">
                            </path>
                        </svg>
                    </a>

                    <a href="javascript:;" data-fullname="{{ $user->fullname }}"
                        class="btn btn-outline btn-error btn-xs btn-delete rounded-full p-3 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z">
                            </path>
                        </svg>
                    </a>
                    <form class="hidden" method="POST" action="{{ url('users/'.$user->id) }}">
                        @csrf
                        @method('delete')
                    </form>
                </td>
            </tr>
            @endforeach
            <tr class="bg-black/80">
                <td colspan="7">{{ $users->links('layouts.pagination')}}</td>
            </tr>

        </tbody>
    </table>
</div>

{{-- Modal Message Created User --}}
<dialog id="modal_message" class="modal">
    <div class="modal-box bg-[#0003] text-white">
        <h3 class="text-lg font-bold mb-2">Congratulations!</h3>
        <div role="alert" class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ session('message') }}</span>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>

{{-- Modal Delete --}}
<dialog id="modal_delete" class="modal">
    <div class="modal-box bg-[#0003] text-white">
        <h3 class="text-lg font-bold mb-2">Are you sure?</h3>
        <div role="alert" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="h-6 w-6 shrink-0 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>You want to delete: <strong class="fullname"></strong></span>
        </div>
        <div class="flex gap-2 mt-4">
            <button class="btn btn-outline btn-success btn-confirm btn-sm">Delete</button>
            <form method="dialog">
                <button type="submit" class="btn btn-outline btn-error btn-sm">Cancel</button>
            </form>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>Cancel</button>
    </form>
</dialog>
@endsection

@section( 'js')
<script>
    $(document).ready(function () {
        // Modal
        const modal_message = document.getElementById('modal_message')
        @if (session('message'))
            modal_message.showModal() 
        @endif

        // Delete User
        $('table').on('click', '.btn-delete', function () {
            $fullname = $(this).data('fullname')
            $('.fullname').text($fullname)
            $frm = $(this).next()
            modal_delete.showModal()
        })
        $('.btn-confirm').click(function (e) {
            e.preventDefault()
            $frm.submit()
        })
    })
</script>
@endsection