@extends('layouts.dashboard')

@section('title', 'Confirm Adoption: Larapets 🐻‍❄️')

@section( 'content')
<h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutral-50 mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
        <path
            d="M149.61,85.71l-89.6,88a8,8,0,0,1-11.22,0L10.39,136a8,8,0,1,1,11.22-11.41L54.4,156.79l84-82.5a8,8,0,1,1,11.22,11.42Zm96.1-11.32a8,8,0,0,0-11.32-.1l-84,82.5-18.83-18.5a8,8,0,0,0-11.21,11.42l24.43,24a8,8,0,0,0,11.22,0l89.6-88A8,8,0,0,0,245.71,74.39Z">
        </path>
    </svg>
    Confirm Adoption
</h1>

{{-- Breadcrumbs --}}
<div class="breadcrumbs text-white text-sm">
    <ul>
        <li>
            <a href="{{ url('dashboard') }}">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M80,40a40,40,0,1,0,40,40A40,40,0,0,0,80,40Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,80,104Zm96,16a40,40,0,1,0-40-40A40,40,0,0,0,176,120Zm0-64a24,24,0,1,1-24,24A24,24,0,0,1,176,56ZM80,136a40,40,0,1,0,40,40A40,40,0,0,0,80,136Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,80,200Zm96-64a40,40,0,1,0,40,40A40,40,0,0,0,176,136Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,176,200Z">
                    </path>
                </svg>
                Dashboard
            </a>
        </li>
        <li>
            <a href="{{ url('makeadoption') }}">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z">
                    </path>
                </svg>
                Make Adoption
            </a>
        </li>
        <li>
            <span class="inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M149.61,85.71l-89.6,88a8,8,0,0,1-11.22,0L10.39,136a8,8,0,1,1,11.22-11.41L54.4,156.79l84-82.5a8,8,0,1,1,11.22,11.42Zm96.1-11.32a8,8,0,0,0-11.32-.1l-84,82.5-18.83-18.5a8,8,0,0,0-11.21,11.42l24.43,24a8,8,0,0,0,11.22,0l89.6-88A8,8,0,0,0,245.71,74.39Z">
                    </path>
                </svg>
                Confirm Adoption
            </span>
        </li>
    </ul>
</div>

{{-- Card --}}
<div class="bg-[#0009] p-10 rounded-sm">
    <div
        class="avatar flex flex-col gap-2 items-center justify-center cursor-pointer hover:scale-110 transition ease-in">
        <div id="upload" class="mask mask-squircle w-48">
            <img id="preview" src="{{ asset('images/'.$pet->image) }}" />
        </div>
    </div>

    {{-- Datos --}}
    <div class="flex gap-2 flex-col md:flex-row">
        <ul class="list bg-[#0009] mt-4 text-white rounded-box shadow-md w-50">
            <li class="list-row">
                <div>
                    <div>Name</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->name }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Kind</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->kind }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Weight</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->weight }} Kg</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Age</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->age }} Years</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Breed</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->breed }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Location</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->location }}</div>
                </div>
            </li>

        </ul>

        <ul class="list bg-[#0009] mt-4 text-white rounded-box shadow-md w-50">
            <li class="list-row">
                <div>
                    <div>Description</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->description }}</div>
                </div>
            </li>


            <li class="list-row">
                <div>
                    <div>Active:
                        @if($pet->active == 1)
                        <div class="badge badge-outline badge-success">Active</div>
                        @else
                        <div class="badge badge-outline badge-error">Inactive</div>
                        @endif
                    </div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Status:
                        @if($pet->status == 0)
                        <div class="badge badge-outline badge-warning">No Adopted</div>
                        @else
                        <div class="badge badge-outline badge-accent">Adopted</div>
                        @endif
                    </div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Created at</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->created_at->diffForHumans()}}
                    </div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Updated at</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->updated_at->diffForHumans()}}
                    </div>
                </div>
            </li>
        </ul>
    </div>

    <div class="flex justify-center items-center">
        <form action="{{ url('makeadoption', $pet->id) }}" method="POST" class="w-full flex justify-center"  onsubmit="if(!confirm('¿Confirmar adopción de ' + {!! json_encode($pet->name) !!} + '?')) return false; this.querySelector('button[type=submit]').disabled = true;">
            @csrf
            <button class="btn btn-outline btn-success mt-4" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z">
                    </path>
                </svg>
                Adopted {{ $pet->name }}
            </button>
        </form>
    </div>
</div>
@endsection