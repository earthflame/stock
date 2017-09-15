from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login,authenticate,logout
from django.contrib.auth.models import User
from kchart.models import Equities,Last
from mongoengine.connection import disconnect
from mongoengine.queryset.visitor import Q
# Create your views here.

def home(request):
    return render(request,'home.html')

def clean_price(x):
    if ',' in x:
        return ''.join(x.split(','))

def mylogin(request):#ajax的回调函数无法使用
    if request.is_ajax() and request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = User.objects.filter(username = username)
        if user:
            auth = authenticate(username = username,password = password)
            if auth:
                login(request,auth)
                return JsonResponse({'username':username,'password':'','code':6003})
            else:
                return JsonResponse({'username':"",'password':'password error','code':6002})
        else:
            return JsonResponse({'username':"user not exits",'password':'','code':6001})

def myregister(request):
    if  request.is_ajax() and request.method == 'POST':
        username = request.POST['username']
        hasuser = User.objects.filter(username = username)
        if hasuser:
            return JsonResponse({'username':"user has exits",'password':'','code':6000})
        else:
            form = UserCreationForm(request.POST)
            if form.is_valid():
                user = form.save()
                login(request,user)
                return JsonResponse({'username':user.username,'password':'','code':6005})

def mylogout(request):
    logout(request)
    return JsonResponse({'code':'kkk'})

def stock(request,exchange_code):
    code,countryname = exchange_code.split('-')
    stock = Equities.objects(code = code)[0]
    print("c:::",exchange_code)
    return render(request,'stockchart.html',context = {'code':code,'company':stock.company,'country':countryname})

def chart(request):
    if request.is_ajax():
        countryname = request.GET['countryname']
        code = request.GET['code']
        stock = Equities.objects(Q(code = code) & Q(country = countryname))[0]
        #转换列表为json
        price_data = stock.price[1:-2]
        price_data.reverse()
        volumes = []
        num = 0
        l = len(price_data)
        for i in range(l):
            v = price_data[i]
            le = len(v)
            for j in range(le):
                if ',' in v[j]:
                    v[j] = ''.join(v[j].split(','))            
        for i in range(l):
            v = price_data[i]
            if len(v[-2]) <= 1:
                volume = float(v[-2])
            else:
                if 'K' in v[-2]:
                    volume = float(v[-2][:-1]) * 1000
                elif 'M' in v[-2]:
                    volume = float(v[-2][:-1]) * 100000
                elif 'B' in v[-2]:
                    volume = float(v[-2][:-1]) * 10000000
                else:
                    volume = float(v[-2][:-1])
                if '-' in v[-1]:
                    num = -1
                else:
                    num = 1
            volumes.append([i,volume,num])
        balance = stock.资产负债表
        income = stock.利润表
        cash = stock.现金流
        #print(price_data)
        return JsonResponse({'price':price_data,'volumes':volumes,'balance':balance,'income':income,'cash':cash})

def search(request):
    if request.is_ajax():
        query = str(request.POST['query'])
        exact_result = Equities.objects(code__iexact = query)
        code_result = Equities.objects(code__istartswith = query)[:3]
        company_result = Equities.objects(company__istartswith = query)[:3]#使用order_by性能会大幅下降
        result = []
        if exact_result:
            for r in exact_result:
                if not r.country:
                    continue
                result.append("<tr class = 'js-item'>" + "<td class='first'>" + "</td>" + "<td class='second'>" + r.code + "</td>" + "<td class='third'>" + r.company + "</td>" + "<td class='last'>" + r.country + "</td></tr>")
        if code_result:
            for i in range(len(code_result)):
                if not code_result[i].country:
                    continue
                result.append("<tr class = 'js-item'><td class='second'>" + code_result[i].code + "</td>" + "<td class='third'>" + code_result[i].company + "</td>" +"<td class='last'>"+ code_result[i].country + "</td></tr>")
        if company_result:
            for i in range(len(company_result)):
                if not company_result[i].country:
                    continue
                result.append("<tr class = 'js-item'><td class='second'>" + company_result[i].code + "</td>" + "<td class='third'>"+ company_result[i].company + "</td>" +"<td class='last'>"+ company_result[i].country + "</td></tr>")
        return JsonResponse({'data':result})

def save_search(request):
    if request.is_ajax():
        user = request.POST['user']
        code = request.POST['code']
        company = request.POST['company']
        country = request.POST['country']
        last = Last.objects(user = user)
        if last:
            last = last[0]
            item = last.lastfive
            if {'code':code,'company':company,'country':country} not in item:
                if len(item) < 5:
                    item.insert(0,{'code':code,'company':company})
                else:
                    item.insert(0,{'code':code,'company':company})
                    item.remove(item[-1])
            else:
                item.remove({'code':code,'company':company,'country':country})
                item.insert(0,{'code':code,'company':company,'country':country})
            last.lastfive = item
            last.save()
            return JsonResponse({'statu':'success'})
        else:
            last = Last(user = user)
            last.lastfive = [{'code':code,'company':company,'country':country}]
            try:
                last.save()
            except:
                pass
            return JsonResponse({'statu':'success'})

def show_search(request):
    if request.is_ajax():
        user = request.GET['user']
        last = Last.objects(user=user)
        if last:
            return JsonResponse({'data':last[0].lastfive})
        else:
            return JsonResponse({'data':[]})

def navigation(request,country):
    equities = Equities.objects(country = country)
    result = []
    for e in equities:
        result.append([e.code,e.company])
    return JsonResponse({'data':result})








    
