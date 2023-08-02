from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import logout
from .forms import NewUserForm # form

# Create your views here.
def register_request(request):
    if request.method == 'POST':
        form = NewUserForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f"Account created for { username } successfully")
            return redirect('fittoapp:index')
    form = NewUserForm()
    return render(request, 'users/register.html', {
        "form": form,
    })

def logout_request(request):
    logout(request)
    messages.success(request, 'You have been logged out.')
    return redirect('fittoapp:index')